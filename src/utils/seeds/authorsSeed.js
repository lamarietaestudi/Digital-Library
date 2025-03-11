const mongoose = require('mongoose');
const Author = require('../../api/models/Author');
const authors = require('../../data/authors');

const initAuthorsSeed = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://maria_sola:fU6ydKeaOyiDCZQo@cluster0.hl4jp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    await Author.deleteMany({});

    await Author.insertMany(authors);
  } catch (error) {
    console.log({ message: 'Authors Seed Error', error: error.message });
  } finally {
    await mongoose.disconnect();
  }
};

initAuthorsSeed();
