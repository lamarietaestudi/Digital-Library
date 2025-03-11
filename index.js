require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const { connectCloudinary } = require('./src/config/cloudinary');
const authorsRoute = require('./src/api/routes/authors');
const booksRoute = require('./src/api/routes/books');

const app = express();

app.use(express.json());

connectDB();
connectCloudinary();

app.use('/api/v1/authors', authorsRoute);
app.use('/api/v1/books', booksRoute);

app.use('/', (req, res, next) => {
  return res.status(200).json('Working successfully');
});

app.use('*', (req, res, next) => {
  return res
    .status(404)
    .json({ message: 'Route not found', error: error.message });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
