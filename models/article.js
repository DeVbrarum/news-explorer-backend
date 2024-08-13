const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Please enter a valid URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => validator.isURL(image),
      message: 'Please enter a valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true },
});

// Crea y exporta el modelo Article
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
