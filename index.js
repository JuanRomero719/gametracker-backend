const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado correctamente a MongoDB'))
  .catch((err) => console.error('❌ Error de conexión a MongoDB:', err));

// Rutas
const juegosRoutes = require('./routes/juegos');
const resenasRoutes = require('./routes/resenas');

app.use('/api/juegos', juegosRoutes);
app.use('/api/resenas', resenasRoutes);

// Arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto', PORT);
});

