// src/config/database.js
const { Sequelize } = require('sequelize');
const path = require('path');

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/biblioteca.sqlite')
});

module.exports = sequelize;  // Exportación directa de la instancia sequelize
