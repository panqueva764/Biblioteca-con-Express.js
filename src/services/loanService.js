// src/services/loanService.js
const loanRepository = require('../repositories/loanRepository');

class LoanService {
  async createLoan(bookId, userId) {
  return loanRepository.createLoan(bookId, userId);
  }

  async returnLoan(bookId, userId) {
    // Buscar el préstamo que coincida con el bookId y userId
    const loan = await loanRepository.findLoanByBookAndUser(bookId, userId);

    if (!loan) {
      throw new Error('No se encontró el préstamo para este libro y usuario');
    }

    // Verificar si el libro ya fue devuelto
    if (loan.isReturned) {
      throw new Error('El libro ya ha sido devuelto');
    }

    // Cambiar el estado del libro a disponible
    const book = await loanRepository.findById(bookId);
    if (!book) {
      throw new Error('Libro no encontrado');
    }
    await book.update({ isAvailable: true });

    // Marcar el préstamo como devuelto
    await loan.update({
      isReturned: true,
      returnDate: new Date(),
    });

    return loan;
  }

  async getLoans() {
    return loanRepository.getLoans();
  }
}

module.exports = new LoanService();
