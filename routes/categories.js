const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Листа на сите категории
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Сите категории
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Креирање нова категорија
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Креирана категорија
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Грешка при креирање категорија
 */
router.post('/', categoryController.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Бришење категорија
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Категорија избришана
 *       404:
 *         description: Категорија не е најдена
 */
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
