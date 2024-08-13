const express = require('express');
const { signup, signin } = require('../controllers/auth');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/signup', signup);

// Ruta para iniciar sesión y recibir un JWT
router.post('/signin', signin);

module.exports = router;
