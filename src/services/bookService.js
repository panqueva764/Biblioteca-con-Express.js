// src/services/bookService.js
const bookRepository = require('../repositories/bookRepository');

class BookService {
  async createBook(data) {
    return bookRepository.create(data);
  }

  async createMultipleBooks(booksData) {
    return bookRepository.createMultiple(booksData);
  }

  async getAllBooks() {
    return bookRepository.findAll();
  }

  async getAvailableBooks() {
    return bookRepository.findAvailable();
  }

  async getUnavailableBooks() {
    return bookRepository.findUnavailable();
  }

  async lendBook(id) {
    return bookRepository.lendBook(id);
  }

  async returnBook(id) {
    return bookRepository.returnBook(id);
  }
  
  async getBooksFiltered(filters) {
    return bookRepository.findBooks(filters);
  }
}

module.exports = new BookService();
