const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    photo: {
      type: String,
      required: true
    },
    info: {
      type: String,
      required: true,
      trim: true
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
      }
    ]
  },
  { timestamps: true }
);

const Author = mongoose.model('Author', authorSchema, 'authors'); // model name , Schema name , collection name
module.exports = Author;
