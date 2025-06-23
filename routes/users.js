// routes/users.js
const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController');

// GET    /api/users       → getAll
router.get('/', userController.getAll);

// POST   /api/users       → create (admin)
router.post('/', userController.register);

// PUT    /api/users/:id   → updateUser
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id   → deleteUser
router.delete('/:id', userController.deleteUser);

module.exports = router;
