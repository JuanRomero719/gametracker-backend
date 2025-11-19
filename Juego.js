const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  portada: { type: String, default: '' },
  completado: { type: Boolean, default: false },
  horas: { type: Number, default: 0 },  // Agregado
  genero: { type: String, default: 'Sin género' },
  plataformas: { type: [String], default: [] },
  clasificacion: { type: String, default: 'Sin clasificación' },
  modo: { type: String, default: 'Sin modo' },
});

module.exports = mongoose.model('Juego', juegoSchema);

