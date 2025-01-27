// src/repositories/bookRepository.js
const { Book } = require('../models/book');
const { Op } = require('sequelize');

class BookRepository {
  /**
   * Crea un nuevo libro en la base de datos.
   * @param {Object} data - Datos del libro a crear.
   * @returns {Promise<Object>} - Libro creado.
   */
  async create(data) {
    return Book.create(data);
  }

  /**
   * Crea múltiples libros en la base de datos.
   * @param {Array<Object>} booksData - Lista de datos de los libros a crear.
   * @returns {Promise<Array<Object>>} - Libros creados.
   */
  async createMultiple(booksData) {
    return Book.bulkCreate(booksData);
  }

  /**
   * Encuentra todos los libros en la base de datos.
   * @returns {Promise<Array<Object>>} - Lista de libros.
   */
  async findAll() {
    return Book.findAll();
  }

  /**
   * Encuentra todos los libros disponibles para préstamo.
   * @returns {Promise<Array<Object>>} - Lista de libros disponibles.
   */
  async findAvailable() {
    return Book.findAll({ where: { isAvailable: true } });
  }

  /**
   * Encuentra todos los libros no disponibles para préstamo.
   * @returns {Promise<Array<Object>>} - Lista de libros no disponibles.
   */
  async findUnavailable() {
    return Book.findAll({ where: { isAvailable: false } });
  }

  /**
   * Marca un libro como prestado.
   * @param {number} id - ID del libro a prestar.
   * @returns {Promise<Object>} - Libro actualizado.
   * @throws {Error} - Si el libro no existe o ya está prestado.
   */
  async lendBook(id) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error('El libro no existe');
    }

    if (!book.isAvailable) {
      throw new Error('El libro ya está prestado');
    }

    await book.update({ isAvailable: false });
    return book;
  }

  /**
   * Marca un libro como devuelto.
   * @param {number} loanId - ID del préstamo a devolver.
   * @returns {Promise<Object>} - Libro actualizado.
   * @throws {Error} - Si el préstamo no existe o el libro no está prestado.
   */
  async returnBook(loanId) {
    const loan = await Book.findByPk(loanId);
    if (!loan) {
      throw new Error('No se puede realziar el prestamo, prueba más tarde');
    }

    const book = await Book.findByPk(loan.id);
    if (book.isAvailable) {
      throw new Error('El libro no está prestado y no puede ser devuelto');
    }

    await book.update({ isAvailable: true });
    await loan.update({ returnDate: new Date() });

    return book;
  }

  /**
   * Encuentra libros filtrados por título o género.
   * @param {Object} filters - Filtros para buscar libros.
   * @param {string} [filters.title] - Título del libro.
   * @param {string} [filters.genre] - Género del libro.
   * @returns {Promise<Array<Object>>} - Lista de libros filtrados.
   */
  async findBooks(filters) {
    const { title, genre } = filters;

    const where = {
      isAvailable: true,  // Solo libros disponibles
      ...(title && { title: { [Op.like]: `%${title}%` } }),  // Filtro por título
      ...(genre && { genre: { [Op.like]: `%${genre}%` } })   // Filtro por género
    };

    return Book.findAll({ where });
  }
}

module.exports = new BookRepository();
