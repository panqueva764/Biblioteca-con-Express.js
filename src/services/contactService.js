// src/services/contactService.js
const axios = require('axios');

class ContactService {
  async fetchContactStats() {
    try {
      const response = await axios.get('http://localhost:8001/contacts/order?order=age-asc');
      const contacts = response.data;

      // Verifica que la respuesta tenga datos
      if (!contacts || contacts.length === 0) {
        throw new Error('No se encontraron contactos');
      }

      // Calcular el total de clientes y el promedio de edad
      const totalClients = contacts.length;
      const totalAge = contacts.reduce((sum, contact) => {
        if (contact.age) {
          // Extraer el valor numérico de la edad
          const ageMatch = contact.age.match(/\d+/); // Buscar el número en la cadena "XX años"
          if (ageMatch) {
            const age = parseInt(ageMatch[0], 10); // Convertir a número entero
            return sum + age;
          }
        }
        return sum;
      }, 0);

      const averageAge = totalClients > 0 ? totalAge / totalClients : 0;

      return {
        totalClients,
        averageAge: parseFloat(averageAge.toFixed(2)), // Redondear a 2 decimales
      };
    } catch (error) {
      throw new Error('Error al obtener estadísticas de contactos: ' + error.message);
    }
  }
}

module.exports = new ContactService();
