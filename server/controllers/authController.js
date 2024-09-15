const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      console.log('Registration attempt:', req.body);
      const { username, password, role } = req.body;
      const result = await authService.registerUser(username, password, role);
      console.log('Registration successful:', result);
      res.status(201).json(result);
    } catch (error) {
      console.error('Detailed registration error:', error);
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: 'Validation Error', details: error.errors });
      } else if (error.code === 11000) {
        res.status(400).json({ message: 'Duplicate username', field: 'username' });
      } else {
        res.status(500).json({ message: 'Server Error', details: error.message });
      }
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.loginUser(username, password);
      res.json(result);
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      if (error.message === 'Invalid credentials') {
        res.status(401).json({ message: 'Login failed. Please check your credentials.' });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }
}

module.exports = new AuthController();