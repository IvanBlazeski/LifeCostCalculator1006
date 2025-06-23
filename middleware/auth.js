// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: "Недостасува token." });

  const token = header.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || "tajna", (err, user) => {
    if (err) return res.status(403).json({ message: "Невалиден token." });
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
