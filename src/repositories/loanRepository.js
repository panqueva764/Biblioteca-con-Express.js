// src/repositories/loanRepository.js
const Loan = require('../models/loan');
const { Book } = require('../models/book');

class LoanRepository {
  // Crear un préstamo
  async createLoan(bookId, userId) {
    // Buscar el libro
    const book = await Book.findByPk(bookId);

    // Verificar si existe y si está disponible
    if (!book) {
      throw new Error('El libro no existe');
    }
    if (!book.isAvailable) {
      throw new Error('El libro ya está prestado');
    }

    // Crear el préstamo
    const loan = await Loan.create({ bookId, userId });

    // Actualizar el estado del libro
    await book.update({ isAvailable: false });

    return loan; // Retornar el préstamo
  }

  // Devolver un préstamo
  async returnLoan(loanId) {
    // Buscar el préstamo
    const loan = await Loan.findByPk(loanId);
    if (!loan || loan.isReturned) {
      throw new Error('El préstamo no existe o ya fue devuelto');
    }

    // Buscar el libro asociado al préstamo
    const book = await Book.findByPk(loan.bookId);

    // Actualizar el préstamo como devuelto y el libro como disponible
    await loan.update({ isReturned: true, returnDate: new Date() });
    await book.update({ isAvailable: true });

    return loan; // Retornar el préstamo actualizado
  }

  async findLoanByBookAndUser(bookId, userId) {
    return Loan.findOne({
      where: {
        bookId: bookId,
        userId: userId,
        isReturned: false,  // Solo los préstamos no devueltos
      },
    });
  }

  async findById (bookId) {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('El libro no existe');
    }

    return book;

  }

  // Obtener todos los préstamos
  async getLoans() {
    return Loan.findAll();
  }
}

module.exports = new LoanRepository();
