// src/config/db.js
const sqlite3 = require('sqlite3').verbose();

// Crear la conexión a la base de datos SQLite en memoria
const db = new sqlite3.Database(':memory:');

module.exports = db;