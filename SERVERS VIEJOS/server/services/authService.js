const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  async registerUser(username, password, role) {
    if (!username || !password || !role) {
      throw new Error('Missing required fields');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    if (!['admin', 'mashguiajTypePermit', 'entryTypePermit', 'receptionTypePermit', 'labTypePermit', 'vineyardTypePermit'].includes(role)) {
      throw new Error('Invalid role');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return { message: 'User registered successfully', userId: newUser._id };
  }

  async loginUser(username, password) {
    console.log(`Intento de inicio de sesión para el usuario: ${username}`);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Usuario no encontrado');
      throw new Error('Invalid credentials');
    }
  
    console.log('Usuario encontrado, comparando contraseñas');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Contraseña incorrecta');
      throw new Error('Invalid credentials');
    }
  
    console.log('Inicio de sesión exitoso, generando token');
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  
    return { token, role: user.role };
  }
}

module.exports = new AuthService();