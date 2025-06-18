const Cost = require('../models/costModel');

// Листа на сите трошоци за НАЈАВЕНИОТ корисник
exports.getAll = async (req, res) => {
  try {
    const costs = await Cost.find({ user: req.user.id }); // само негови трошоци!
    res.json(costs);
  } catch (err) {
    res.status(500).json({ message: "Грешка при листање трошоци." });
  }
};

// Креирај нов трошок (user полето се зема од token-от!)
exports.create = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const cost = await Cost.create({
      amount, description, category, date,
      user: req.user.id    // сетирај од токенот, НЕ од body!
    });
    res.status(201).json(cost);
  } catch (err) {
    console.error("COST CREATE ERROR:", err);
    res.status(400).json({ message: "Грешка при креирање трошок.", error: err.message });
  }
};

// Детали за еден трошок
exports.getById = async (req, res) => {
  try {
    const cost = await Cost.findOne({ _id: req.params.id, user: req.user.id });
    if (!cost) return res.status(404).json({ message: "Не постои трошок." });
    res.json(cost);
  } catch (err) {
    res.status(500).json({ message: "Грешка при пребарување." });
  }
};

// Ажурирај трошок (само ако припаѓа на user-от!)
exports.update = async (req, res) => {
  try {
    const cost = await Cost.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, 
      req.body, { new: true }
    );
    if (!cost) return res.status(404).json({ message: "Не постои трошок." });
    res.json(cost);
  } catch (err) {
    res.status(400).json({ message: "Грешка при ажурирање." });
  }
};

// Избриши трошок (само ако припаѓа на user-от!)
exports.remove = async (req, res) => {
  try {
    const cost = await Cost.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!cost) return res.status(404).json({ message: "Не постои трошок." });
    res.json({ message: "Трошок избришан." });
  } catch (err) {
    res.status(500).json({ message: "Грешка при бришење." });
  }
};
