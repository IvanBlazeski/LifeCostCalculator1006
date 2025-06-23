const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../emailService');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Сите полиња се задолжителни." });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Веќе постои корисник со овој email." });

    // Ако не е зададена улога, default e 'user'
    const user = await User.create({ name, email, password, role: role || 'user' });

    await sendEmail(
      user.email,
      'Добредојде во Life Cost Calculator!',
      `Здраво ${user.name}, благодариме што се регистриравте.`
    );

    res.status(201).json({ message: "Успешна регистрација.", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
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
    res.json({ message: "Успешна најава.", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Грешка при најава.", error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Грешка при вчитување корисници.", error: err.message });
  }
};

// ✅ Ажурирај корисник
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updated) return res.status(404).json({ message: 'Корисникот не е пронајден.' });

    res.json({ message: 'Корисникот е успешно изменет.', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Грешка при ажурирање.', error: err.message });
  }
};

// ✅ Избриши корисник
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Корисникот не е пронајден.' });

    res.json({ message: 'Корисникот е избришан.' });
  } catch (err) {
    res.status(500).json({ message: 'Грешка при бришење.', error: err.message });
  }
};
