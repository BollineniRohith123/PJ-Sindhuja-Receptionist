const express = require('express');
const AICallController = require('../controllers/AICallController');

const router = express.Router();

// AI Call routes
router.post('/ai-calls', AICallController.initiateAICall);
router.get('/ai-calls/:id', AICallController.getAICallStatus);

module.exports = router;
