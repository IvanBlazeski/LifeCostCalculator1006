const express = require('express');
const router = express.Router();
const costController = require('../controllers/costController');

/**
 * @swagger
 * /api/costs:
 *   get:
 *     summary: Листа на сите трошоци
 *     tags: [Costs]
 *     responses:
 *       200:
 *         description: Сите трошоци
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cost'
 */
router.get('/', costController.getAll);

/**
 * @swagger
 * /api/costs:
 *   post:
 *     summary: Креирање нов трошок
 *     tags: [Costs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cost'
 *     responses:
 *       201:
 *         description: Трошок креиран
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cost'
 *       400:
 *         description: Грешка при креирање трошок
 */
router.post('/', costController.create);

/**
 * @swagger
 * /api/costs/{id}:
 *   put:
 *     summary: Ажурирање на трошок
 *     tags: [Costs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cost'
 *     responses:
 *       200:
 *         description: Трошок ажуриран
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cost'
 *       404:
 *         description: Трошок не е најден
 */
router.put('/:id', costController.update);

/**
 * @swagger
 * /api/costs/{id}:
 *   delete:
 *     summary: Бришење трошок
 *     tags: [Costs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Трошок избришан
 *       404:
 *         description: Трошок не е најден
 */
router.delete('/:id', costController.remove);

module.exports = router;
