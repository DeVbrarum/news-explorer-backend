require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDB = 'mongodb://localhost:27017/newsdb';

app.use(bodyParser.json());

// Registrar todas las solicitudes de la API
app.use(requestLogger);

// Rutas públicas (sin protección de autenticación)
app.use('/', authRoutes);

// Rutas protegidas
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

// Manejo de errores (personalizado o middleware general)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'An error occurred' });
});

// Registrar errores
app.use(errorLogger);

mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
