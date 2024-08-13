const Article = require('../models/article');

// Controlador que devuelve todos los artículos guardados por el usuario
const getSavedArticles = (req, res, next) => {
  const userId = req.user._id;

  Article.find({ owner: userId })
    .then((articles) => res.send(articles))
    .catch(next);
};

// Controlador que crea un nuevo artículo
const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(201).send(article))
    .catch(next);
};

// Controlador que elimina un artículo por su ID
const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        return res.status(404).send({ message: 'Article not found' });
      }

      if (article.owner.toString() !== userId) {
        return res.status(403).send({ message: 'Forbidden' });
      }

      return article.deleteOne().then(() => res.send({ message: 'Article deleted' }));
    })
    .catch(next);
};

module.exports = {
  getSavedArticles,
  createArticle,
  deleteArticle,
};
