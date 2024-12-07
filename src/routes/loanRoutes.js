// src/routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

/**
 * @swagger
 * /api/loans:
 *   post:
 *     summary: Crear un préstamo
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               bookId:
 *                 type: integer
 *               loanDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Préstamo creado correctamente
 */
router.post('/loans', loanController.createLoan);

/**
 * @swagger
 * /api/loans/return:
 *   post:
 *     summary: Devolver un préstamo
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loanId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Préstamo devuelto correctamente
 */
router.post('/loans/return', loanController.returnLoan);

/**
 * @swagger
 * /api/loans/return/{id}:
 *   put:
 *     summary: Devolver préstamo por ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del préstamo a devolver
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Préstamo devuelto correctamente
 */
router.put('/loans/return/:id', loanController.returnLoan);

/**
 * @swagger
 * /api/loans:
 *   get:
 *     summary: Obtener todos los préstamos
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: Listado de todos los préstamos
 */
router.get('/loans', loanController.getLoans);

module.exports = router;
