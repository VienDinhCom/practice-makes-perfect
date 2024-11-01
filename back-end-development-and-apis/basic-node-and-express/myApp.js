const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// app.get('/', (req, res) => {
//   res.send('Hello Express');
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// app.get('/json', (req, res) => {
//   res.json({ message: 'Hello json' });
// });

app.get('/json', (req, res) => {
  const message = 'Hello json';
  const isUppercase = process.env.MESSAGE_STYLE === 'uppercase';

  res.json({ message: isUppercase ? message.toUpperCase() : message });
});

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

app.get('/name', (req, res) => {
  const { first, last } = req.query;

  res.json({ name: `${first} ${last}` });
});

app.post('/name', (req, res) => {
  const { first, last } = req.body;

  res.json({ name: `${first} ${last}` });
});

module.exports = app;
