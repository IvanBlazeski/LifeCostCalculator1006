const Category = require('../models/category'); // или categoryModel ако така се вика

// Креирање категорија
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Името е задолжително" });
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: "Грешка при креирање категорија", error: err.message });
    }
};

// Сите категории
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Грешка при преземање категории", error: err.message });
    }
};

// Избриши категорија
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.json({ message: "Категоријата е избришана" });
    } catch (err) {
        res.status(500).json({ message: "Грешка при бришење категорија", error: err.message });
    }
};
