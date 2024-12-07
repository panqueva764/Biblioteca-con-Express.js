// src/repositories/bookRepository.js
const { Book } = require('../models/book');

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
    // Buscar libro
    const book = await Book.findByPk(id);

    // Verificar si el libro existe y si está disponible
    if (!book) {
      throw new Error('El libro no existe');
    }

    if (!book.isAvailable) {
      throw new Error('El libro ya está prestado');
    }

    // Marcar libro como prestado
    await book.update({ isAvailable: false });
    return book;
  }

  async returnBook(loanId) {
    // Buscar el préstamo por ID
    const loan = await Book.findByPk(loanId);
    
    if (!loan) {
      throw new Error('El préstamo no existe');
    }

    const book = await Book.findByPk(loan.id);
    
    // Verificar si el libro está prestado
    if (book.isAvailable) {
      throw new Error('El libro no está prestado y no puede ser devuelto');
    }

    // Devolver el libro: marcarlo como disponible
    await book.update({ isAvailable: true });

    // También puedes actualizar el préstamo con la fecha de devolución
    await loan.update({ returnDate: new Date() });

    return book;
  }
}

module.exports = new BookRepository();
