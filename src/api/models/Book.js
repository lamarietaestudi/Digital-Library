const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['misterio', 'ficción', 'aventuras', 'sátira']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    isbn: {
      type: String,
      required: false
    },
    img: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema, 'books'); // model name , Schema name , collection name
module.exports = Book;
