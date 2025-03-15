const { DataTypes } = require('sequelize');
const sequelize = require('../services/database');

const AICall = sequelize.define('AICall', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\+?[1-9]\d{1,14}$/ // International phone number validation
    }
  },
  selectedPackage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  additionalDetails: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'ai_calls',
  timestamps: true
});

module.exports = AICall;
