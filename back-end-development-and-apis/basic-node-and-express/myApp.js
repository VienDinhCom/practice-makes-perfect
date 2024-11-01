const path = require('path');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

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

module.exports = app;
