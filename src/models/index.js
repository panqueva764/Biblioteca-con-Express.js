const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './biblioteca.sqlite', // Base de datos en disco
});

module.exports = sequelize;
