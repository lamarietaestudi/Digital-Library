const Book = require('../api/models/Book');
const Author = require('../api/models/Author');

const createBook = async ({ title, isbn, category, author, year, img }) => {
  const defaultImg = img || `pendiente-de-asignar-${Date.now()}`;

  if (!title || !isbn) {
    throw new Error('El título del libro y el número ISBN son obligatorios');
  }

  const existingBook = await Book.findOne({ isbn });
  if (existingBook) {
    throw new Error('Este libro ya está registrado en la BBDD.');
  }

  if (author) {
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      throw new Error('Este autor no existe en la BBDD.');
    }
  }

  const newBook = new Book({
    title,
    isbn,
    category: category || 'pendiente de asignar',
    author: author || null,
    year: year || 'pendiente de asignar',
    img: defaultImg
  });

  const bookSaved = await newBook.save();

  if (author) {
    const existingAuthor = await Author.findById(author);
    existingAuthor.books.push(bookSaved._id);
    await existingAuthor.save();
  }

  return bookSaved;
};

module.exports = createBook;
