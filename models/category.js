const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false } // ← ова го бара!
});

module.exports = mongoose.model('Category', categorySchema);
