const Cost = require('../models/costModel'); // или cost.js ако така се вика


// Листа на сите трошоци
exports.getAll = async (req, res) => {
  try {
    const costs = await Cost.find();
    res.json(costs);
  } catch (err) {
    res.status(500).json({ message: "Грешка при листање трошоци." });
  }
};

// Креирај нов трошок
exports.create = async (req, res) => {
  try {
    const { amount, description, category, date, user } = req.body;
    const cost = await Cost.create({ amount, description, category, date, user });
    res.status(201).json(cost);
  } catch (err) {
    console.error("COST CREATE ERROR:", err); // ДОДАЈ ГО ОВА ЗА ДА ГЛЕДАШ ТОЧНО ШТО Е ГРЕШКАТА
    res.status(400).json({ message: "Грешка при креирање трошок.", error: err.message });
  }
};

// Детали за еден трошок
exports.getById = async (req, res) => {
  try {
    const cost = await Cost.findById(req.params.id);
    if (!cost) return res.status(404).json({ message: "Не постои трошок." });
    res.json(cost);
  } catch (err) {
    res.status(500).json({ message: "Грешка при пребарување." });
  }
};

// Ажурирај трошок
exports.update = async (req, res) => {
  try {
    const cost = await Cost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cost) return res.status(404).json({ message: "Не постои трошок." });
    res.json(cost);
  } catch (err) {
    res.status(400).json({ message: "Грешка при ажурирање." });
  }
};

// Избриши трошок
exports.remove = async (req, res) => {
  try {
    const cost = await Cost.findByIdAndDelete(req.params.id);
    if (!cost) return res.status(404).json({ message: "Не постои трошок." });
    res.json({ message: "Трошок избришан." });
  } catch (err) {
    res.status(500).json({ message: "Грешка при бришење." });
  }
};

// Dummy route за тест
exports.dummy = (req, res) => {
  res.json({ message: "Dummy cost route works!" });
};
