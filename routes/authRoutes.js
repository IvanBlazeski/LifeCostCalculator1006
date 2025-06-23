// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { sendWelcomeEmail } = require('../mailer'); // Прилагоди го патот ако треба

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Сите полиња се задолжителни.' });
    }

    // Проверка дали корисникот веќе постои
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Корисник со овој email веќе постои.' });
    }

    // Креирање корисник (bcrypt се грижи во model-u)
    const user = await User.create({ name, email, password, role: 'user' });

    // Генерирање JWT
    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET || 'tajna',
      { expiresIn: '1h' }
    );

    // Испраќање welcome email
    await sendWelcomeEmail(email, name);

    res.status(201).json({
      token,
      message: 'Успешна регистрација!',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Регистрација грешка:', err);
    res.status(500).json({ message: 'Грешка при регистрација.', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и лозинка се задолжителни.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Корисникот не постои.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Невалидна лозинка.' });
    }

    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET || 'tajna',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      message: 'Успешна најава!',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Најава грешка:', err);
    res.status(500).json({ message: 'Грешка при најава.', error: err.message });
  }
});

module.exports = router;
