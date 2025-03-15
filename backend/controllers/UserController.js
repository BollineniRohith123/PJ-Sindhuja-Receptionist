const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserController {
  // Create a new user
  static async createUser(req, res) {
    try {
      const { username, email, password, role } = req.body;

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'user'
      });

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating user',
        error: error.message
      });
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username', 'email', 'role']
      });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching users',
        error: error.message
      });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'username', 'email', 'role']
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching user',
        error: error.message
      });
    }
  }
}

module.exports = UserController;
