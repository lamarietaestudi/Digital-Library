const mongoose = require('mongoose');
const Book = require('../../api/models/Book');
const Author = require('../../api/models/Author');
const books = require('../../data/books');

const initBooksSeed = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://maria_sola:fU6ydKeaOyiDCZQo@cluster0.hl4jp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    await Book.deleteMany({});

    const authors = await Author.find();
    if (authors.length === 0) {
      throw new error({
        message:
          'No hay ningún autor para asignar libros. Solución: ejecuta npm run authorsSeed primero.',
        error: error.message
      });
    }
    const booksToInsert = books.map((book) => {
      const authorFound = authors.find((author) => author.name === book.author);
      return authorFound ? { ...book, author: authorFound._id } : book;
    });

    const booksInserted = await Book.insertMany(booksToInsert);

    for (const author of authors) {
      const booksByAuthor = booksInserted.filter(
        (book) => book.author?.toString() === author._id.toString()
      );
      await Author.findByIdAndUpdate(author._id, {
        $set: { books: booksByAuthor.map((book) => book._id) }
      });
    }
  } catch (error) {
    console.log({ message: 'Books Seed Error', error: error.message });
  } finally {
    await mongoose.disconnect();
  }
};

initBooksSeed();
