const express = require('express');
const auth = require('../middlewares/auth');
const userRoutes = require('../controllers/users');

const router = express.Router();

// Ruta protegida que devuelve la información del usuario conectado
router.get('/me', auth, userRoutes.getUserInfo);

module.exports = router;
