const express = require('express');
const {
  getSavedArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const auth = require('../middlewares/auth');
const router = express.Router();

// Ruta protegida que devuelve todos los artículos guardados por el usuario
router.get('/', auth, getSavedArticles);

// Ruta protegida que crea un nuevo artículo
router.post('/', auth, createArticle);

// Ruta protegida que elimina un artículo por su ID
router.delete('/:articleId', auth, deleteArticle);

module.exports = router;
