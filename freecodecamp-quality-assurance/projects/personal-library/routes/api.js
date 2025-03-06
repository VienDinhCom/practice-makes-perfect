'use strict';

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: [String],
});

const Book = mongoose.model('Book', BookSchema);

module.exports = function (app) {
  app
    .route('/api/books')
    .get(async function (req, res) {
      try {
        const books = await Book.find({});

        // Map to required format with commentcount
        const response = books.map((book) => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        }));

        res.json(response);
      } catch (err) {
        res.status(500).json({ error: 'error retrieving books' });
      }
    })

    .post(async function (req, res) {
      let title = req.body.title;

      if (!title) {
        return res.send('missing required field title');
      }

      try {
        const newBook = new Book({ title: title, comments: [] });
        const book = await newBook.save();

        res.json({ _id: book._id, title: book.title });
      } catch (err) {
        res.status(500).json({ error: 'error saving book' });
      }
    })

    .delete(async function (req, res) {
      try {
        await Book.deleteMany({});

        res.send('complete delete successful');
      } catch (err) {
        res.status(500).json({ error: 'error deleting books' });
      }
    });

  app
    .route('/api/books/:id')
    .get(async function (req, res) {
      let bookid = req.params.id;

      try {
        const book = await Book.findById(bookid);

        if (!book) {
          return res.send('no book exists');
        }

        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
        });
      } catch (err) {
        if (err.name === 'CastError') {
          return res.send('no book exists');
        }

        res.status(500).json({ error: 'error retrieving book' });
      }
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!comment) {
        return res.send('missing required field comment');
      }

      try {
        const book = await Book.findById(bookid);

        if (!book) {
          return res.send('no book exists');
        }

        book.comments.push(comment);

        await book.save();

        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
        });
      } catch (err) {
        if (err.name === 'CastError') {
          return res.send('no book exists');
        }

        res.status(500).json({ error: 'error updating book' });
      }
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;

      try {
        const book = await Book.findByIdAndDelete(bookid);

        if (!book) {
          return res.send('no book exists');
        }

        res.send('delete successful');
      } catch (err) {
        if (err.name === 'CastError') {
          return res.send('no book exists');
        }

        res.status(500).json({ error: 'error deleting book' });
      }
    });
};
