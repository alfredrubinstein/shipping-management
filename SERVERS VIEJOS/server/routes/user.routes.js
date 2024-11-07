// routes/user.routes.js
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    res.json({ message: 'User login' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;