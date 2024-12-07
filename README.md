# Biblioteca Api

Este repositorio contiene un sistema de **gestión de biblioteca** donde los usuarios pueden consultar y gestionar libros, además de realizar reservas. El proyecto está construido con **Node.js** y utiliza **Swagger** para la documentación de la API y **Mocha** para las pruebas unitarias.

## Descripción del Proyecto

Este proyecto proporciona una API para gestionar una biblioteca. Los usuarios pueden consultar libros, ver detalles, realizar reservas y obtener información sobre su historial de préstamos.

## Requisitos

- Node.js
- Express.js
- MYSQL (o cualquier base de datos que elijas)
- Swagger (para la documentación de la API)
- Jest (para las pruebas unitarias)

## Instalación

1. **Clonar el repositorio**

   ```bash
   https://github.com/panqueva764/Biblioteca-con-Express.js.git
   cd biblioteca
   npm install
   node src/app.js
   ```

2. **Ya corriendo puedes revisar la documentación Swagger**


## Arquitectura del Sistema

- Modelo de Datos
El sistema tiene modelos para los libros, usuarios y reservas. Los libros tienen atributos como título, autor, y disponibilidad. Los usuarios pueden realizar reservas para los libros y hacer consultas sobre ellos.

- Patrón de Diseño
Utiliza un patrón MVC (Modelo-Vista-Controlador) para separar la lógica de negocio de la presentación y la manipulación de datos.
- Funciones Clave
Consultar libros disponibles.
Realizar reservas para libros.
Ver el historial de préstamos de un usuario.

4. **Colección de Apis**

El Access_key debes solicitarlo para poder descargar e importar y poder probar las apis en tu local

https://api.postman.com/collections/32474160-94925a7e-649c-4925-9304-7fa1bfaa2da0?access_key=***
