const Book = require('../models/Book');
const deleteCloudinaryImage = require('../../utils/deleteImage');
const createBook = require('../../utils/createBook');

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('author');
    return res.status(200).json(books);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error in Get Books controller', error: error.message });
  }
};

const postBooks = async (req, res, next) => {
  try {
    const { title, category, author, year, isbn } = req.body;
    const img = req.file?.path;

    const bookSaved = await createBook({
      title,
      category,
      author,
      year,
      isbn,
      img
    });

    return res.status(201).json(bookSaved);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error in Post Book controller', error: error.message });
  }
};

const updateBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const book = await Book.findById(id);

    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    if (req.file) {
      await deleteCloudinaryImage(book.img);
      updateData.img = req.file.path;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar el libro', error: error.message });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    await deleteCloudinaryImage(book.img);
    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: 'Libro eliminado correctamente', book });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar el libro', error: error.message });
  }
};

module.exports = {
  getBooks,
  postBooks,
  updateBooks,
  deleteBooks
};
