// models/resena.js
const mongoose = require('mongoose');

const ReseñaSchema = new mongoose.Schema(
  {
    juegoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Juego', required: true },
    autor: { type: String, required: true, trim: true },
    comentario: { type: String, required: true, trim: true },
    estrellas: { type: Number, required: true, min: 1, max: 5 },
    horas: { type: Number, default: 0 },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reseña', ReseñaSchema);
