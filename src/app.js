const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes'); // Importar rutas de préstamo
const sequelize = require('./config/database'); // Cambiado: importación directa
const { swaggerSpec, swaggerUi } = require('./config/swagger'); // Importar Swagger

const app = express();
app.use(bodyParser.json());

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Ruta para acceder a Swagger UI

// Rutas de la API
app.use('/api', bookRoutes);
app.use('/api', loanRoutes);  // Rutas para préstamos

// Sincronización de la base de datos (forzar recreación en desarrollo)
sequelize.sync({ force: true })  // Cambiado: agregar { force: true } para recrear tablas
  .then(() => console.log('Base de datos sincronizada y tablas recreadas'))
  .catch(err => console.log('Error al sincronizar la base de datos: ', err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
