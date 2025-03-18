const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'pendiente de asignar',
      enum: [
        'misterio',
        'ficción',
        'aventuras',
        'sátira',
        'pendiente de asignar'
      ]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      default: null
    },
    year: {
      type: String,
      default: 'pendiente de asignar'
    },
    isbn: {
      type: String,
      required: true,
      unique: true
    },
    img: {
      type: String,
      default: 'pendiente de asignar'
    }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema, 'books'); // model name , Schema name , collection name
module.exports = Book;
