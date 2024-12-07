// src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Registrar libros (individual o en masa)
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 genre:
 *                   type: string
 *     responses:
 *       200:
 *         description: Libros registrados correctamente
 */
router.post('/books', bookController.addBook); // Cambiado a addBook

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Consultar todos los libros
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Listado de todos los libros
 */
router.get('/books', bookController.getBooks);

/**
 * @swagger
 * /api/books/available:
 *   get:
 *     summary: Consultar libros disponibles
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Listado de libros disponibles
 */
router.get('/books/available', bookController.getAvailableBooks);

/**
 * @swagger
 * /api/books/unavailable:
 *   get:
 *     summary: Consultar libros no disponibles
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Listado de libros no disponibles
 */
router.get('/books/unavailable', bookController.getUnavailableBooks);

/**
 * @swagger
 * /api/books/lend/{id}:
 *   post:
 *     summary: Prestar libro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro a prestar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Libro prestado correctamente
 */
router.post('/books/lend/:id', bookController.lendBook);

/**
 * @swagger
 * /api/books/return/{id}:
 *   put:
 *     summary: Devolver libro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro a devolver
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Libro devuelto correctamente
 */
router.put('/books/return/:id', bookController.returnBook);

router.get('/books', bookController.getBooks);  // Esta ruta ya está configurada para aceptar query params


module.exports = router;
