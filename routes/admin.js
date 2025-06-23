const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/user');

router.get('/all', auth, admin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;
