const User = require('../models/user');
const Cost = require('../models/costModel');
const Category = require('../models/category');
const Comment = require('../models/comment');
const Notification = require('../models/notifications');

// Избриши ги сите податоци од базата
exports.resetDb = async (req, res) => {
  try {
    await User.deleteMany({});
    await Cost.deleteMany({});
    await Category.deleteMany({});
    await Comment.deleteMany({});
    await Notification.deleteMany({});
    res.json({ message: "Базата е избришана (reset)." });
  } catch (err) {
    res.status(500).json({ message: "Грешка при reset.", error: err.message });
  }
};

// Внеси иницијални податоци
exports.seedDb = async (req, res) => {
  try {
    // Пример: демо корисник, категорија и трошок
    const demoUser = await User.create({ name: "Demo User", email: "demo@demo.com", password: "demo123" });
    const demoCategory = await Category.create({ name: "Храна", user: demoUser._id });
    const demoCost = await Cost.create({
      name: "Пица",
      amount: 400,
      user: demoUser._id,
      category: demoCategory._id,
      date: new Date()
    });

    res.json({
      message: "Се креирани иницијални податоци!",
      user: demoUser,
      category: demoCategory,
      cost: demoCost
    });
  } catch (err) {
    res.status(500).json({ message: "Грешка при seed.", error: err.message });
  }
};
