// src/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

/**
 * @swagger
 * /api/contacts/stats:
 *   get:
 *     summary: Obtener estadísticas de contactes (cantidad y promedio de edad)
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Estadísticas de contactes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalContacts:
 *                   type: integer
 *                   description: Número total de contactes
 *                 averageAge:
 *                   type: number
 *                   format: float
 *                   description: Promedio de edad de los contactes
 */
router.get('/contacts/stats', contactController.getContactStats);

module.exports = router;
