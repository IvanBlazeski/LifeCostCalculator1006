const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Сите полиња се задолжителни." });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Веќе постои корисник со овој email." });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Успешна регистрација.", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Грешка при регистрација.", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Погрешен email или лозинка." });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ message: "Погрешен email или лозинка." });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "tajna", { expiresIn: "1d" });
    res.json({ message: "Успешна најава.", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Грешка при најава.", error: err.message });
  }
};

exports.getAll = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
