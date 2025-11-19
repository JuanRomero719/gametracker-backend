// routes/resenas.js
const express = require('express');
const router = express.Router();
const Reseña = require('../models/resena');

// Crear reseña
router.post('/', async (req, res) => {
  try {
    const { juegoId, autor, comentario, estrellas, horas } = req.body;

    if (!juegoId || !autor || !comentario || !estrellas) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const reseña = new Reseña({
      juegoId,
      autor: autor.trim(),
      comentario: comentario.trim(),
      estrellas: Number(estrellas),
      horas: Number(horas || 0),
    });

    const guardada = await reseña.save();
    res.status(201).json(guardada);
  } catch (err) {
    console.error('❌ Error al guardar reseña:', err.message);
    res.status(500).json({ error: 'Error al guardar reseña', detalle: err.message });
  }
});

// Listar reseñas por juego
router.get('/por-juego/:juegoId', async (req, res) => {

  try {
    const reseñas = await Reseña.find({ juegoId: req.params.juegoId }).sort({ fecha: -1 });
    res.json(reseñas);
  } catch (err) {
    console.error('❌ Error al listar reseñas:', err.message);
    res.status(500).json({ error: 'Error al listar reseñas', detalle: err.message });
  }
});

// Eliminar reseña
router.delete('/:id', async (req, res) => {
  try {
    await Reseña.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error('❌ Error al eliminar reseña:', err.message);
    res.status(500).json({ error: 'Error al eliminar reseña', detalle: err.message });
  }
});

module.exports = router;
