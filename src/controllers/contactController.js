// src/controllers/contactController.js
const contactService = require('../services/contactService');

const getContactStats = async (req, res) => {
  try {
    const stats = await contactService.fetchContactStats();
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getContactStats };
