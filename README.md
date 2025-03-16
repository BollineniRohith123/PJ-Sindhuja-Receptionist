# Hospital Buddy System

A modern healthcare management system with AI-powered services for reception, insurance processing, and emergency care.

## Features

- 24/7 Emergency Care Support
- Intelligent Reception Services
- Insurance Processing Automation
- Digital Health Records
- Patient Support System
- Expert Medical Staff Coordination

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express.js, SQLite
- **AI Integration**: Ultravox AI for voice interactions
- **Communication**: Twilio for phone calls

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BollineniRohith123/PJ-Sindhuja-Receptionist.git
cd PJ-Sindhuja-Receptionist
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create .env file in backend directory with required environment variables:
```
PORT=3000
ULTRAVOX_API_KEY=your_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
```

5. Start the backend server:
```bash
cd backend
npm start
```

6. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
