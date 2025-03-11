const cloudinary = require('cloudinary').v2;
const Book = require('../models/Book');
const Author = require('../models/Author');

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

    if (!img) {
      return res
        .status(400)
        .json({ message: 'Es necesario incluir una imagen' });
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({
        message: 'Este libro ya está registrado en la BBDD.'
      });
    }
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Este autor no existe en la BBDD.'
      });
    }

    const newBook = new Book({
      title,
      category,
      author,
      year,
      isbn,
      img
    });
    const bookSaved = await newBook.save();

    existingAuthor.books.push(bookSaved._id);
    await existingAuthor.save();

    console.log('Libro guardado:', bookSaved);

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
      const publicId = book.img?.split('/').slice(-2).join('/').split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
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

    const publicId = book.img?.split('/').slice(-2).join('/').split('.')[0];

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: 'Libro eliminado correctamente' });
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
