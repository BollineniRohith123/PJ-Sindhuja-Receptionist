# Hospital Buddy System - Technical Documentation

## System Overview

The Hospital Buddy System is a modern healthcare management platform that leverages AI-powered services for reception, insurance processing, and emergency care. The system is designed to streamline healthcare operations, improve patient experience, and enhance clinical workflows.

### Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express.js, SQLite
- **AI Integration**: Ultravox AI for voice interactions
- **Communication**: Twilio for phone calls

## Backend API Documentation

### Server Configuration

The backend server is built with Express.js and includes the following middleware:

- CORS configuration for cross-origin requests
- JSON body parsing with validation
- Request logging
- Error handling

### API Endpoints

#### User API

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/users` | POST | Create a new user | `{ username, email, password, role }` | `{ message, user: { id, username, email, role } }` |
| `/api/users` | GET | Get all users | - | Array of users with `id`, `username`, `email`, `role` |
| `/api/users/:id` | GET | Get user by ID | - | User object with `id`, `username`, `email`, `role` |

#### AI Call API

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/ai-calls` | POST | Initiate an AI call | `{ phoneNumber, selectedPackage, token }` | `{ message, aiCall: { id, phoneNumber, selectedPackage, status, joinUrl } }` |
| `/api/ai-calls/:id` | GET | Get AI call status | - | AI call object with `id`, `phoneNumber`, `selectedPackage`, `status`, `createdAt`, `additionalDetails` |

### Database Models

#### User Model

```javascript
{
  id: INTEGER (Primary Key, Auto Increment),
  username: STRING (Unique, Not Null),
  email: STRING (Unique, Not Null, Email Validation),
  password: STRING (Not Null, Hashed),
  role: ENUM ['user', 'admin'] (Default: 'user')
}
```

#### AI Call Model

```javascript
{
  id: INTEGER (Primary Key, Auto Increment),
  phoneNumber: STRING (Not Null, Phone Number Validation),
  selectedPackage: STRING (Not Null),
  token: STRING (Not Null),
  status: ENUM ['pending', 'in-progress', 'completed', 'failed'] (Default: 'pending'),
  additionalDetails: JSON (Nullable)
}
```

#### Patient Model

```javascript
{
  id: UUID (Primary Key, Default: UUIDV4),
  name: STRING (Not Null),
  phone_number: STRING (Not Null, Phone Number Validation),
  email: STRING (Nullable, Email Validation),
  address: TEXT (Nullable),
  medical_history: TEXT (Nullable),
  insurance_info: JSON (Nullable),
  created_at: DATE (Default: NOW),
  updated_at: DATE (Default: NOW)
}
```

### AI Integration

The system integrates with Ultravox AI for voice interactions and Twilio for phone calls. The AI Call Controller handles the creation of AI calls with different system prompts based on the selected package:

- **Hospital Reception**: General inquiries, appointments, and patient registration
- **Insurance Processing**: Insurance verification and claims processing
- **Emergency Response**: Urgent care and emergency services
- **Specialist Consultation**: Connect with medical specialists for expert opinions
- **Patient Follow-up**: Schedule follow-up appointments for continued care

## Frontend Components

### Pages

- **Index**: Main landing page with hero section and features section
- **NotFound**: 404 page for handling invalid routes

### Layout Components

- **Header**: Navigation bar with mobile-responsive menu
- **Footer**: Footer with links and newsletter subscription

### Section Components

- **HeroSection**: Main hero section with call-to-action form
- **FeaturesSection**: Features showcase with cards and benefits

### UI Components

The frontend uses Shadcn UI components for consistent design and user experience.

## Recommended Updates and Improvements

### Backend Enhancements

1. **Authentication and Authorization**:
   - Implement JWT-based authentication
   - Add role-based access control for API endpoints
   - Create middleware for protected routes

2. **Database Improvements**:
   - Add relationships between models (e.g., User to Patient)
   - Implement database migrations for version control
   - Consider moving to a more robust database for production (PostgreSQL, MySQL)

3. **API Expansion**:
   - Add CRUD operations for Patient model
   - Implement appointment scheduling endpoints
   - Create endpoints for medical records management

4. **Security Enhancements**:
   - Implement rate limiting to prevent abuse
   - Add input sanitization for all API endpoints
   - Set up proper environment variable management
   - Implement HTTPS for secure communication

5. **Error Handling and Logging**:
   - Enhance error handling with custom error classes
   - Implement structured logging with levels (info, warn, error)
   - Add request ID tracking for better debugging

6. **Performance Optimization**:
   - Implement caching for frequently accessed data
   - Add pagination for list endpoints
   - Optimize database queries

### Frontend Enhancements

1. **User Authentication**:
   - Add login/signup pages
   - Implement protected routes
   - Add user profile management

2. **Additional Pages**:
   - Dashboard for doctors and administrators
   - Patient management interface
   - Appointment scheduling calendar
   - Medical records viewer

3. **UI/UX Improvements**:
   - Implement dark mode
   - Add more interactive elements
   - Enhance mobile responsiveness
   - Implement form validation with better user feedback

4. **State Management**:
   - Consider using Redux or Context API for global state
   - Implement proper loading and error states
   - Add offline support with service workers

5. **Performance Optimization**:
   - Implement code splitting
   - Add image optimization
   - Improve bundle size

### AI Integration Enhancements

1. **Voice Interaction Improvements**:
   - Add more specialized AI prompts for different medical scenarios
   - Implement voice recognition for patient identification
   - Create custom voice models for different languages

2. **Analytics and Reporting**:
   - Add call recording and transcription
   - Implement sentiment analysis for patient interactions
   - Create dashboards for call analytics

3. **Integration with Other Systems**:
   - Connect with Electronic Health Record (EHR) systems
   - Integrate with pharmacy management systems
   - Add support for telemedicine platforms

## Deployment Considerations

1. **Infrastructure**:
   - Set up CI/CD pipelines for automated deployment
   - Implement containerization with Docker
   - Consider using Kubernetes for orchestration

2. **Scaling**:
   - Implement horizontal scaling for handling increased load
   - Set up load balancing
   - Consider serverless architecture for certain components

3. **Monitoring and Maintenance**:
   - Set up health checks and monitoring
   - Implement automated backups
   - Create disaster recovery plans

## Conclusion

The Hospital Buddy System provides a solid foundation for a modern healthcare management platform. By implementing the recommended updates and improvements, the system can be enhanced to provide a more comprehensive, secure, and scalable solution for healthcare providers and patients.