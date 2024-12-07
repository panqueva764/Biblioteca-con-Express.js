// src/controllers/loanController.js
const loanService = require('../services/loanService');

const createLoan = async (req, res) => {
  try {
    const { bookId, userId } = req.body; // Datos desde la solicitud
    const loan = await loanService.createLoan(bookId, userId); // Crear préstamo
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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

const getLoans = async (req, res) => {
  try {
    const loans = await loanService.getLoans(); // Obtener todos los préstamos
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createLoan, returnLoan, getLoans };
