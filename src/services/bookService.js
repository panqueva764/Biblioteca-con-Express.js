// src/services/bookService.js
const bookRepository = require('../repositories/bookRepository');

class BookService {
  /**
   * Crea un nuevo libro utilizando el repositorio.
   * @param {Object} data - Datos del libro a crear.
   * @returns {Promise<Object>} - Libro creado.
   */
  async createBook(data) {
    return bookRepository.create(data);
  }

  /**
   * Crea múltiples libros utilizando el repositorio.
   * @param {Array<Object>} booksData - Lista de datos de los libros a crear.
   * @returns {Promise<Array<Object>>} - Libros creados.
   */
  async createMultipleBooks(booksData) {
    return bookRepository.createMultiple(booksData);
  }

  /**
   * Obtiene todos los libros registrados.
   * @returns {Promise<Array<Object>>} - Lista de libros.
   */
  async getAllBooks() {
    return bookRepository.findAll();
  }

  /**
   * Obtiene todos los libros disponibles para préstamo.
   * @returns {Promise<Array<Object>>} - Lista de libros disponibles.
   */
  async getAvailableBooks() {
    return bookRepository.findAvailable();
  }

  /**
   * Obtiene todos los libros no disponibles para préstamo.
   * @returns {Promise<Array<Object>>} - Lista de libros no disponibles.
   */
  async getUnavailableBooks() {
    return bookRepository.findUnavailable();
  }

  /**
   * Marca un libro como prestado.
   * @param {number} id - ID del libro a prestar.
   * @returns {Promise<Object>} - Libro actualizado.
   */
  async lendBook(id) {
    return bookRepository.lendBook(id);
  }

  /**
   * Marca un libro como devuelto.
   * @param {number} id - ID del préstamo del libro a devolver.
   * @returns {Promise<Object>} - Libro actualizado.
   */
  async returnBook(id) {
    return bookRepository.returnBook(id);
  }

  /**
   * Obtiene libros filtrados por título y/o género.
   * @param {Object} filters - Filtros para buscar libros.
   * @param {string} [filters.title] - Título del libro.
   * @param {string} [filters.genre] - Género del libro.
   * @returns {Promise<Array<Object>>} - Lista de libros filtrados.
   */
  async getBooksFiltered(filters) {
    return bookRepository.findBooks(filters);
  }
}

module.exports = new BookService();
