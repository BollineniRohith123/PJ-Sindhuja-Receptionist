const AICall = require('../models/AICall');
const { validatePhoneNumber } = require('../services/validationService');
const twilio = require('twilio');
const https = require('https');

// Configuration Constants
const CONFIG = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  ultravox: {
    apiUrl: 'https://api.ultravox.ai/api/calls'
  }
};

// System Prompt for the AI Agent
const SYSTEM_PROMPT = `
You are an AI assistant helping users with their inquiries.
Provide clear, concise, and helpful responses.
`;

// Issue Prompt for handling customer problems
const ISSUE_PROMPT = `
You are a professional customer support AI assistant specializing in resolving technical and service-related issues.
Key guidelines:
- Listen carefully to the customer's problem
- Demonstrate empathy and understanding
- Provide step-by-step troubleshooting guidance
- Offer alternative solutions if the primary solution is not feasible
- Escalate to human support if the issue is complex or cannot be resolved
`;

// Product Selling Prompt for sales interactions
const SELLING_PROMPT = `
You are an AI sales representative for Rohith, focusing on consultative selling.
Key objectives:
- Understand the customer's needs and preferences
- Highlight the unique features and benefits of our products
- Provide personalized product recommendations
- Address potential concerns or objections
- Create a compelling value proposition
- Maintain a friendly, professional, and helpful tone
`;

// Enquiry Prompt for general customer inquiries
const ENQUIRY_PROMPT = `
You are an AI customer service representative for Sunil.
Communication guidelines:
- Be welcoming and approachable
- Listen actively to the customer's questions
- Provide accurate, concise, and relevant information
- Direct customers to the most appropriate resources
- If the query is complex, offer to connect with a human agent
- Maintain a helpful and professional demeanor
`;

class AICallController {
  /**
   * Creates an Ultravox call
   * @param {string} token - Ultravox API token
   * @param {string} selectedPackage - Selected package type
   * @returns {Promise<Object>} Ultravox call response
   */
  static createUltravoxCall(token, selectedPackage) {
    return new Promise((resolve, reject) => {
      console.log('[DEBUG] Creating Ultravox Call with Token:', token);
  
      // Dynamically select system prompt based on selectedPackage
      let systemPrompt = SYSTEM_PROMPT;
      switch (selectedPackage) {
        case 'Enquiry':
          systemPrompt = ENQUIRY_PROMPT;
          break;
        case 'Issue':
          systemPrompt = ISSUE_PROMPT;
          break;
        case 'Selling':
          systemPrompt = SELLING_PROMPT;
          break;
        default:
          console.warn(`[WARN] Unknown package type: ${selectedPackage}. Using default system prompt.`);
      }
  
      const payload = JSON.stringify({
        systemPrompt: systemPrompt,
        model: 'fixie-ai/ultravox',
        voice: 'terrence',
        temperature: 0.3,
        firstSpeaker: 'FIRST_SPEAKER_USER',
        medium: { "twilio": {} }
      });
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': token,
          'Content-Length': Buffer.byteLength(payload)
        }
      };
  
      const req = https.request(CONFIG.ultravox.apiUrl, options, (res) => {
        let responseData = '';
  
        res.on('data', (chunk) => {
          responseData += chunk;
        });
  
        res.on('end', () => {
          try {
            console.log('[DEBUG] Ultravox API Response:', responseData);
            const parsedResponse = JSON.parse(responseData);
            
            // Validate the response
            if (!parsedResponse.joinUrl) {
              console.error('[ERROR] No joinUrl found in Ultravox response');
              reject(new Error('Invalid Ultravox API response: Missing joinUrl'));
              return;
            }
  
            resolve(parsedResponse);
          } catch (error) {
            console.error('[ERROR] Parsing Ultravox response:', error);
            reject(new Error(`Failed to parse Ultravox response: ${error.message}`));
          }
        });
      });
  
      req.on('error', (error) => {
        console.error('[ERROR] Ultravox API request failed:', error);
        reject(new Error(`Ultravox API request failed: ${error.message}`));
      });
  
      req.write(payload);
      req.end();
    });
  }

  /**
   * Initiate an AI call
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async initiateAICall(req, res) {
    console.log('[DEBUG] initiateAICall called');
    console.log('[DEBUG] Request body:', req.body);

    try {
      const { 
        phoneNumber, 
        selectedPackage, 
        token 
      } = req.body;

      // Input validation
      if (!phoneNumber || !selectedPackage || !token) {
        return res.status(400).json({
          message: 'Missing required fields',
          requiredFields: ['phoneNumber', 'selectedPackage', 'token']
        });
      }

      // Phone number validation
      if (!validatePhoneNumber(phoneNumber)) {
        return res.status(400).json({
          message: 'Invalid phone number format',
          expectedFormat: '+911234567890'
        });
      }

      // Twilio configuration check
      if (!CONFIG.twilio.accountSid || !CONFIG.twilio.authToken) {
        return res.status(500).json({
          message: 'Missing Twilio configuration'
        });
      }

      // Create AI Call record
      const aiCall = await AICall.create({
        phoneNumber,
        selectedPackage,
        token,
        status: 'pending',
        additionalDetails: req.body.additionalDetails || null
      });

      // Create Ultravox Call
      const ultravoxCall = await AICallController.createUltravoxCall(token, selectedPackage);

      // Initiate Twilio Call
      const twilioClient = twilio(CONFIG.twilio.accountSid, CONFIG.twilio.authToken);
      const call = await twilioClient.calls.create({
        twiml: `<Response><Connect><Stream url="${ultravoxCall.joinUrl}"/></Connect></Response>`,
        to: phoneNumber,
        from: CONFIG.twilio.phoneNumber
      });

      // Update AI Call status
      aiCall.status = 'in-progress';
      aiCall.additionalDetails = {
        ...aiCall.additionalDetails,
        ultravoxJoinUrl: ultravoxCall.joinUrl,
        twilioCallSid: call.sid
      };
      await aiCall.save();

      res.status(201).json({
        message: 'AI Call initiated successfully',
        aiCall: {
          id: aiCall.id,
          phoneNumber: aiCall.phoneNumber,
          selectedPackage: aiCall.selectedPackage,
          status: aiCall.status,
          joinUrl: ultravoxCall.joinUrl
        }
      });
    } catch (error) {
      console.error('[ERROR] initiateAICall:', error);
      res.status(500).json({
        message: 'Error processing AI Call request',
        error: error.message,
        stack: error.stack
      });
    }
  }

  /**
   * Get AI Call status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getAICallStatus(req, res) {
    try {
      const aiCall = await AICall.findByPk(req.params.id, {
        attributes: ['id', 'phoneNumber', 'selectedPackage', 'status', 'createdAt', 'additionalDetails']
      });

      if (!aiCall) {
        return res.status(404).json({ message: 'AI Call not found' });
      }

      res.status(200).json(aiCall);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving AI Call status',
        error: error.message
      });
    }
  }



}

module.exports = AICallController;
