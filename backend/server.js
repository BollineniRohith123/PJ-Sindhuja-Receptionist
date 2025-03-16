require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Database initialization
const { initializeDatabase } = require('./services/database');

// Routes
const userRoutes = require('./routes/userRoutes');
const aiCallRoutes = require('./routes/aiCallRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enhanced body parsing middleware
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      if (buf.length) {
        JSON.parse(buf.toString());
      }
    } catch (e) {
      console.error('Invalid JSON:', e);
      throw new Error('Invalid JSON payload');
    }
  },
  limit: '1mb' // Increase payload size limit if needed
}));
app.use(express.urlencoded({ 
  extended: true,
  limit: '1mb' 
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  next();
});

// Initialize routes
app.use('/api', userRoutes);
app.use('/api', aiCallRoutes);

// Welcome API Route
app.get('/api/welcome', (req, res) => {
  try {
    res.json({
      message: 'Welcome to the Tata Play Demo Web Backend!',
      status: 'success',
      apiKeys: {
        ultravox: process.env.ULTRAVOX_API_KEY ? 'Configured' : 'Not Set',
        daily: process.env.DAILY_API_KEY ? 'Configured' : 'Not Set',
        cartesia: process.env.CARTESIA_API_KEY ? 'Configured' : 'Not Set'
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route Not Found',
    path: req.path
  });
});

// Start the server and initialize database
async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
