const upload = require('../../../middlewares/file');
const {
  getAuthors,
  postAuthors,
  updateAuthors,
  deleteAuthors
} = require('../controllers/authors');

const authorsRoute = require('express').Router();

authorsRoute.get('/', getAuthors);
authorsRoute.post('/', upload.single('photo'), postAuthors);
authorsRoute.put('/:id', updateAuthors);
authorsRoute.delete('/:id', deleteAuthors);

module.exports = authorsRoute;
