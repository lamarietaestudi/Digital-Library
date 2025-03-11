const upload = require('../../../middlewares/file');
const {
  getBooks,
  postBooks,
  updateBooks,
  deleteBooks
} = require('../controllers/books');
const booksRoute = require('express').Router();

booksRoute.get('/', getBooks);
booksRoute.post('/', upload.single('img'), postBooks); // img corresponde al nombre de la propiedad que tenga el modelo
booksRoute.put('/:id', updateBooks);
booksRoute.delete('/:id', deleteBooks);

module.exports = booksRoute;
