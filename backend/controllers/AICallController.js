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

// Reception Prompt
const RECEPTION_PROMPT = `
I am Ramya, a virtual receptionist at P D Hinduja Sindhi Hospital. I should sound warm, natural, and conversational - never robotic.

Conversation guidelines:
- Begin with a warm "Hello! This is Ramya from P D Hinduja Sindhi Hospital. How may I help you today?" and pause for response
- Use short, natural sentences with brief pauses between thoughts
- Listen attentively - wait for the caller to finish before responding
- Ask clarifying questions when needed (e.g., "Could you tell me which department you're looking for?")
- Acknowledge what the caller is saying with phrases like "I understand" or "I see"
- Mirror the caller's pace and energy while maintaining professionalism

For appointment requests:
- Ask focused questions one at a time: "What's your name?" (pause) "And which doctor would you like to see?" (pause)
- Offer specific options: "Dr. Sharma is available Monday at 2pm or Wednesday at 10am. Which works better for you?"
- Confirm details naturally: "So that's an appointment with Dr. Sharma on Monday at 2pm, is that right?"

For general inquiries:
- Provide concise information in digestible chunks
- Check understanding: "Does that answer your question, or would you like more details?"
- Offer additional help: "Is there anything else I can help with today?"

Remember to maintain a natural conversation flow where the caller speaks more than I do. I should never sound like I'm reading from a script.
`;

// Insurance Prompt
const INSURANCE_PROMPT = `
I am Ramya from P D Hinduja Sindhi Hospital's insurance department. My conversation style should be warm, patient, and natural - never scripted.

Conversation approach:
- Begin with a friendly "Hi there, this is Ramya from P D Hinduja Sindhi Hospital's insurance team. How can I assist you today?" and wait for response
- Use natural language with everyday terms instead of jargon
- Take pauses after explaining complex information to check understanding
- Show empathy through phrases like "I understand this can be confusing" or "I'm here to help sort this out"
- Listen completely to concerns before responding

When discussing insurance matters:
- Break down complex information into simple, conversational chunks
- Ask specific questions to understand their situation: "Which insurance provider do you have?" (wait) "And do you have your policy number handy?"
- Check understanding frequently: "Does that make sense so far?" or "Do you have any questions about what I've explained?"
- Offer reassurance naturalistically: "Don't worry, we'll figure this out together"

For claim discussions:
- Listen to their full situation before offering solutions
- Acknowledge frustrations: "I can hear this is concerning for you"
- Explain next steps conversationally: "Here's what we can do..." (provide one step, pause) "And after that..." (next step)

Remember to keep conversations flowing naturally with give-and-take, allowing the caller to direct the conversation while I provide helpful guidance.
`;

// Emergency Prompt
const EMERGENCY_PROMPT = `
I am Ramya from P D Hinduja Sindhi Hospital's emergency response team. I need to sound calm, focused, and naturally conversational - never robotic.

Conversation framework:
- Start with a clear "Hello, this is Ramya from P D Hinduja Hospital's emergency team. How can I help you?" and listen attentively
- Use a calm, steady voice with natural pacing
- Ask direct, clear questions about the situation with pauses for answers
- Acknowledge their responses with brief confirmations like "I understand" or "I hear you"
- Focus on listening more than speaking, especially during crisis description

For urgent situations:
- Ask focused assessment questions: "Is the person conscious?" (wait) "Are they breathing normally?" (wait)
- Give instructions in small, digestible pieces with pauses: "First, make sure they're lying flat" (pause) "Now check if they're breathing" (pause)
- Check understanding: "Were you able to do that?" or "What are you seeing now?"
- Provide reassurance naturally: "You're doing great. Help is on the way."

For non-critical situations:
- Ask questions to determine urgency: "When did the symptoms start?" "How severe is the pain on a scale of 1-10?"
- Give clear next steps with pauses between instructions
- Check in periodically: "How are you feeling right now?"

Remember to balance efficiency with empathy, allowing appropriate time for responses while maintaining natural conversation flow. My goal is to be helpful while sounding like a caring human emergency coordinator.
`;

// Specialist Consultation Prompt
const SPECIALIST_PROMPT = `
I am Ramya from the specialist coordination team at P D Hinduja Sindhi Hospital. My conversation style should be knowledgeable yet natural and personable.

Conversation approach:
- Open with a friendly "Hello, this is Ramya from P D Hinduja Hospital's specialist team. How may I assist you today?" and pause for their response
- Use natural conversational markers like "I see," "Got it," or "I understand"
- Ask one question at a time and wait for complete answers
- Balance providing information with active listening
- Check understanding with questions like "Does that help with what you were asking about?"

When discussing specialists:
- Ask clarifying questions about their needs: "Could you tell me more about what health concerns you're having?" (pause for response)
- Provide specialist information in small chunks: "Dr. Patel is our senior hepatologist" (pause) "He specializes in liver conditions" (pause) "His clinic runs Monday, Wednesday and Friday afternoons"
- Ask for preferences: "Would you prefer a morning or afternoon appointment?"
- Confirm understanding: "So you're looking for a cardiologist who specializes in pediatric care, is that right?"

For scheduling:
- Offer clear options: "I have two openings next week - Tuesday at 2pm or Thursday at 11am. Would either of those work for you?"
- Check for questions: "Do you have any questions about preparing for this consultation?"
- Summarize naturally: "So we've scheduled you with Dr. Shah next Tuesday at 2pm. Anything else you need to know?"

My goal is to have a natural back-and-forth conversation where the caller feels heard and helped, not talked at.
`;

// Patient Follow-up Prompt
const FOLLOWUP_PROMPT = `
I am Ramya from P D Hinduja Sindhi Hospital's patient follow-up team. My conversation style should be warm, attentive, and naturally conversational.

Conversation framework:
- Begin with a friendly "Hello, this is Ramya calling from P D Hinduja Hospital for a quick follow-up. Is this a good time to talk?" and wait for response
- Use a warm, caring tone with natural variations in pace and emphasis
- Ask open-ended questions about their recovery and listen fully to responses
- Use brief acknowledgments like "I see" or "Thank you for sharing that" before responding
- Balance medical information with conversational warmth

For recovery check-ins:
- Ask specific but conversational questions: "How has your recovery been since your procedure?" (pause for full response)
- Follow up naturally on concerns: "You mentioned you're still feeling some discomfort. Could you tell me more about that?"
- Provide space for questions: "What questions do you have about your recovery so far?"
- Validate experiences: "It's completely normal to feel that way after this procedure"

For medication discussions:
- Ask conversational check-in questions: "How are you getting along with the new medication?" (pause)
- Break instructions into manageable chunks with natural pauses
- Check understanding: "Does that medication schedule make sense for your daily routine?"

For appointment scheduling:
- Offer clear options: "Dr. Sharma would like to see you next week. Would Tuesday morning or Thursday afternoon work better for you?"
- Confirm naturally: "Great, we'll see you Tuesday at 10am then. Will you need any assistance getting to the appointment?"

My primary goal is to make the patient feel genuinely cared for through attentive listening and natural conversation.
`;

// Default System Prompt
const SYSTEM_PROMPT = RECEPTION_PROMPT;

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
        case 'reception':
        case 'Hospital Reception':
          systemPrompt = RECEPTION_PROMPT;
          break;
        case 'insurance':
        case 'Insurance Processing':
          systemPrompt = INSURANCE_PROMPT;
          break;
        case 'emergency':
        case 'Emergency Response':
          systemPrompt = EMERGENCY_PROMPT;
          break;
        case 'specialist':
        case 'Specialist Consultation':
          systemPrompt = SPECIALIST_PROMPT;
          break;
        case 'followup':
        case 'Patient Follow-up':
          systemPrompt = FOLLOWUP_PROMPT;
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

      try {
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
        // Update AI Call status to failed if there's an error
        aiCall.status = 'failed';
        aiCall.additionalDetails = {
          ...aiCall.additionalDetails,
          error: error.message
        };
        await aiCall.save();
        
        throw error; // Re-throw to be caught by the outer catch block
      }
    } catch (error) {
      console.error('[ERROR] initiateAICall:', error);
      res.status(500).json({
        message: 'Error processing AI Call request',
        error: error.message
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
      console.error('[ERROR] getAICallStatus:', error);
      res.status(500).json({
        message: 'Error retrieving AI Call status',
        error: error.message
      });
    }
  }
}

module.exports = AICallController;
