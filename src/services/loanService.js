// src/services/loanService.js
const loanRepository = require('../repositories/loanRepository');

class LoanService {
  /**
   * Crea un nuevo préstamo para un libro y un usuario.
   * @param {number} bookId - ID del libro a prestar.
   * @param {number} userId - ID del usuario que solicita el préstamo.
   * @returns {Promise<Object>} - Préstamo creado.
   */
  async createLoan(bookId, userId) {
    return loanRepository.createLoan(bookId, userId);
  }

  /**
   * Marca un préstamo como devuelto para un libro y un usuario.
   * @param {number} bookId - ID del libro a devolver.
   * @param {number} userId - ID del usuario que devuelve el libro.
   * @returns {Promise<Object>} - Préstamo actualizado.
   * @throws {Error} - Si no se encuentra el préstamo, el libro o ya ha sido devuelto.
   */
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

  /**
   * Obtiene todos los préstamos registrados.
   * @returns {Promise<Array<Object>>} - Lista de préstamos.
   */
  async getLoans() {
    return loanRepository.getLoans();
  }
}

module.exports = new LoanService();
