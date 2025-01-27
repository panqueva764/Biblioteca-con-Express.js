// src/controllers/loanController.js
const loanService = require('../services/loanService');

/**
 * Crea un nuevo préstamo de un libro para un usuario.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Datos del préstamo.
 * @param {string} req.body.bookId - ID del libro a prestar.
 * @param {string} req.body.userId - ID del usuario que solicita el préstamo.
 * @param {Object} res - Objeto de respuesta.
 */
const createLoan = async (req, res) => {
  try {
    const { bookId, userId } = req.body; // Datos desde la solicitud
    const loan = await loanService.createLoan(bookId, userId); // Crear préstamo
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Marca un préstamo como devuelto para un usuario y libro específicos.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Datos del préstamo.
 * @param {string} req.body.bookId - ID del libro a devolver.
 * @param {string} req.body.userId - ID del usuario que devuelve el libro.
 * @param {Object} res - Objeto de respuesta.
 */
const returnLoan = async (req, res) => {
  try {
    const { bookId, userId } = req.body; // Obtener bookId y userId desde el cuerpo de la solicitud

    // Llamamos al servicio para devolver el libro
    const loan = await loanService.returnLoan(bookId, userId);

    res.status(200).json({
      message: 'Libro devuelto con éxito',
      loan: loan,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

/**
 * Obtiene la lista de todos los préstamos registrados.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
const getLoans = async (req, res) => {
  try {
    const loans = await loanService.getLoans(); // Obtener todos los préstamos
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exportamos los controladores para ser utilizados en las rutas
module.exports = { createLoan, returnLoan, getLoans };
