const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Carga variables de .env

const app = express();
app.use(express.json()); // Para parsear JSON en requests

// Conectar a MongoDB con la URI proporcionada
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a la base de datos de la escuela con éxito'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend de GameTracker funcionando! Prueba de conexión.');
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Servidor en puerto ${port}`));

const resenasRouter = require('./.qodo/models/routes/resenas');
app.use('/resenas', resenasRouter); // Monta en /reseñas