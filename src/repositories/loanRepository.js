// src/repositories/loanRepository.js
const Loan = require('../models/loan');
const { Book } = require('../models/book');

class LoanRepository {
  /**
   * Crea un nuevo préstamo para un libro.
   * @param {number} bookId - ID del libro a prestar.
   * @param {number} userId - ID del usuario que solicita el préstamo.
   * @returns {Promise<Object>} - Préstamo creado.
   * @throws {Error} - Si el libro no existe o no está disponible.
   */
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

    return loan;
  }

  /**
   * Marca un préstamo como devuelto.
   * @param {number} loanId - ID del préstamo a devolver.
   * @returns {Promise<Object>} - Préstamo actualizado.
   * @throws {Error} - Si el préstamo no existe o ya fue devuelto.
   */
  async returnLoan(loanId) {
    const loan = await Loan.findByPk(loanId);
    if (!loan || loan.isReturned) {
      throw new Error('El préstamo no existe o ya fue devuelto');
    }

    // Buscar el libro asociado al préstamo
    const book = await Book.findByPk(loan.bookId);

    // Actualizar el préstamo como devuelto y el libro como disponible
    await loan.update({ isReturned: true, returnDate: new Date() });
    await book.update({ isAvailable: true });

    return loan;
  }

  /**
   * Busca un préstamo activo por libro y usuario.
   * @param {number} bookId - ID del libro asociado al préstamo.
   * @param {number} userId - ID del usuario asociado al préstamo.
   * @returns {Promise<Object|null>} - Préstamo encontrado o null.
   */
  async findLoanByBookAndUser(bookId, userId) {
    return Loan.findOne({
      where: {
        bookId: bookId,
        userId: userId,
        isReturned: false,  // Solo los préstamos no devueltos
      },
    });
  }

  /**
   * Busca un libro por su ID.
   * @param {number} bookId - ID del libro a buscar.
   * @returns {Promise<Object>} - Libro encontrado.
   * @throws {Error} - Si el libro no existe.
   */
  async findById(bookId) {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('El libro no existe');
    }

    return book;
  }

  /**
   * Obtiene todos los préstamos registrados.
   * @returns {Promise<Array<Object>>} - Lista de préstamos.
   */
  async getLoans() {
    return Loan.findAll();
  }
}

module.exports = new LoanRepository();
