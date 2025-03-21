const Author = require('../models/Author');
const deleteCloudinaryImage = require('../../utils/deleteImage');
const createBook = require('../../utils/createBook');

const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().populate('books');
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({
      message: 'Error in Get Authors controller',
      error: error.message
    });
  }
};

const postAuthors = async (req, res, next) => {
  try {
    const { name, info, books } = req.body;
    const photo = req.file?.path;

    if (!photo) {
      return res
        .status(400)
        .json({ message: 'Es necesario incluir una imagen' });
    }

    if (!info) {
      return res
        .status(400)
        .json({ message: 'Es necesario incluir información adicional' });
    }

    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor) {
      return res.status(400).json({
        message: 'Este autor ya está registrado en la BBDD.'
      });
    }

    const newAuthor = new Author({ name, photo, info, books: [] });
    const authorSaved = await newAuthor.save();

    if (books) {
      const booksArray = JSON.parse(books);
      for (const bookData of booksArray) {
        await createBook({ ...bookData, author: authorSaved._id });
      }
    }

    return res.status(201).json(authorSaved);
  } catch (error) {
    return res.status(500).json({
      message: 'Error in Post Authors controller',
      error: error.message
    });
  }
};

const updateAuthors = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({ message: 'Autor no encontrado.' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      await deleteCloudinaryImage(author.photo);
      updateData.photo = req.file.path;
    }

    const authorUpdated = await Author.findByIdAndUpdate(id, updateData, {
      new: true
    });

    return res.status(200).json(authorUpdated);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Update Authors controller',
      error: error.message
    });
  }
};

const deleteAuthors = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);

    if (!author)
      return res.status(404).json({ message: 'Autor no encontrado.' });

    await deleteCloudinaryImage(author.photo);
    await Author.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: 'Autor eliminado correctamente', author });
  } catch (error) {
    return res.status(500).json({
      message: 'Error in Delete Authors controller',
      error: error.message
    });
  }
};

module.exports = {
  getAuthors,
  postAuthors,
  updateAuthors,
  deleteAuthors
};
