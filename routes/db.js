const express = require('express');
const router = express.Router();
const dbController = require('../db/dbController');

/**
 * @swagger
 * /db/reset:
 *   delete:
 *     summary: Бришење на сите податоци во базата
 *     tags: [DB]
 *     responses:
 *       200:
 *         description: Сите податоци се избришани
 */
router.delete('/reset', dbController.resetDb);

/**
 * @swagger
 * /db/seed:
 *   post:
 *     summary: Внесување иницијални податоци
 *     tags: [DB]
 *     responses:
 *       201:
 *         description: Внесени иницијални податоци
 */
router.post('/seed', dbController.seedDb);

module.exports = router;
