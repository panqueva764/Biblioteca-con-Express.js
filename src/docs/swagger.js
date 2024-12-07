// src/docs/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca API',
      version: '1.0.0',
      description: 'API para gestionar una biblioteca',
    },
  },
  apis: ['./src/routes/*.js'], // Archivos donde documentas los endpoints
};

const swaggerDocs = swaggerJsDoc(options);
module.exports = swaggerDocs;
