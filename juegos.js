const express = require('express');
const Juego = require('../models/Juego'); // Importa el modelo que creamos antes

const router = express.Router(); // Crea un mini-servidor para rutas

// 1. BUSCAR TODOS LOS JUEGOS (GET /juegos)
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find().sort({ createdAt: -1 });
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. AGREGAR UN JUEGO (POST /juegos)
router.post('/', async (req, res) => {
  try {
    const { 
      titulo, 
      portada,  // Cambiado de portadaUrl a portada para coincidir con esquema
      completado, 
      horas, 
      genero, 
      plataformas, 
      clasificacion, 
      modo 
    } = req.body;

    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ message: 'El título es obligatorio.' });
    }

    const juego = new Juego({
      titulo: titulo.trim(),
      portada: portada || '',  // Usa portada
      completado: Boolean(completado),
      horas: Number(horas) || 0,  // Si agregas al esquema
      genero: genero || 'Sin género',
      plataformas: plataformas || [],
      clasificacion: clasificacion || 'Sin clasificación',
      modo: modo || 'Sin modo'
    });

    const guardado = await juego.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. EDITAR UN JUEGO (PUT /juegos/:id)
router.put('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Encuentra por ID y actualiza
    if (!juego) return res.status(404).json({ message: 'Juego no encontrado' });
    res.json(juego);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. ELIMINAR UN JUEGO (DELETE /juegos/:id)
router.delete('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id); // Borra por ID
    if (!juego) return res.status(404).json({ message: 'Juego no encontrado' });
    res.json({ message: 'Juego eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; // Exporta para usar en index.js