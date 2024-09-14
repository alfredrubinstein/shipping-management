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
      console.error('Registration error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.loginUser(username, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();