const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes'); // Importar rutas de préstamo
const contactRoutes = require('./routes/contactRoutes'); // Importar las rutas de contactes
const sequelize = require('./config/database'); // Cambiado: importación directa
const { swaggerSpec, swaggerUi } = require('./config/swagger'); // Importar Swagger

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Ruta para acceder a Swagger UI

// Rutas de la API
app.use('/api', bookRoutes);
app.use('/api', loanRoutes);  // Rutas para préstamos
app.use('/api', contactRoutes); // Rutas de contactos

// Sincronización de la base de datos (forzar recreación en desarrollo)
sequelize.sync({ force: true })
  .then(() => console.log('Base de datos sincronizada y tablas recreadas'))
  .catch(err => console.log('Error al sincronizar la base de datos: ', err));

// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
