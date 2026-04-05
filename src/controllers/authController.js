const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Create user. Viewer is default but can be specified.
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'Viewer',
    });

    const userData = { id: user.id, username: user.username, email: user.email, role: user.role };
    res.status(201).json({ message: 'User registered successfully!', user: userData });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (user.status === 'Inactive') {
      return res.status(403).json({ message: 'Account is inactive. Please contact support.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
