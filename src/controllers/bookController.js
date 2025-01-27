// src/controllers/bookController.js
const bookService = require('../services/bookService');

/**
 * Obtiene la lista de libros según los filtros proporcionados.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.query - Parámetros de consulta.
 * @param {string} [req.query.title] - Título del libro para filtrar.
 * @param {string} [req.query.genre] - Género del libro para filtrar.
 * @param {Object} res - Objeto de respuesta.
 */
const getBooks = async (req, res) => {
  try {
    const { title, genre } = req.query; // Parámetros de filtro desde la query string
    const filters = { title, genre };   // Creamos el objeto de filtros

    const books = await bookService.getBooksFiltered(filters);  // Llamamos al servicio con los filtros
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Agrega uno o varios libros al sistema.
 * @param {Object} req - Objeto de solicitud.
 * @param {Array|Object} req.body - Información del libro(s) a agregar.
 * @param {Object} res - Objeto de respuesta.
 */
const addBook = async (req, res) => {
  try {
    // Si se envía un array de libros
    if (Array.isArray(req.body)) {
      const books = await bookService.createMultipleBooks(req.body);
      return res.status(201).json(books);
    }
    // Si se envía solo un libro
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Marca un libro como prestado.
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.id - ID del libro a prestar.
 * @param {Object} res - Objeto de respuesta.
 */
const lendBook = async (req, res) => {
  try {
    const book = await bookService.lendBook(req.params.id);
    res.status(200).json({ message: 'Libro prestado', book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Marca un libro como devuelto.
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.id - ID del libro a devolver.
 * @param {Object} res - Objeto de respuesta.
 */
const returnBook = async (req, res) => {
  try {
    const book = await bookService.returnBook(req.params.id);
    res.status(200).json({ message: 'Libro devuelto', book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Obtiene la lista de libros disponibles para préstamo.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
const getAvailableBooks = async (req, res) => {
  try {
    const books = await bookService.getAvailableBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Obtiene la lista de libros no disponibles para préstamo.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
const getUnavailableBooks = async (req, res) => {
  try {
    const books = await bookService.getUnavailableBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exportamos los controladores para ser utilizados en las rutas
module.exports = { getBooks, addBook, lendBook, returnBook, getAvailableBooks, getUnavailableBooks };
