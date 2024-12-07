// src/repositories/bookRepository.js
const { Book } = require('../models/book');
const { Op } = require('sequelize');  // Necesario para realizar filtros avanzados

class BookRepository {
  async create(data) {
    return Book.create(data);
  }

  async createMultiple(booksData) {
    return Book.bulkCreate(booksData);
  }

  async findAll() {
    return Book.findAll();
  }

  async findAvailable() {
    return Book.findAll({ where: { isAvailable: true } });
  }

  async findUnavailable() {
    return Book.findAll({ where: { isAvailable: false } });
  }

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

  async returnBook(loanId) {
    const loan = await Book.findByPk(loanId);
    if (!loan) {
      throw new Error('El préstamo no existe');
    }

    const book = await Book.findByPk(loan.id);
    if (book.isAvailable) {
      throw new Error('El libro no está prestado y no puede ser devuelto');
    }

    await book.update({ isAvailable: true });
    await loan.update({ returnDate: new Date() });

    return book;
  }

  // Método para filtrar libros por título o género
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
