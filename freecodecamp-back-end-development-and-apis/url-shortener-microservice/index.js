const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const shortid = require('shortid');
const dns = require('dns/promises');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config();

/* MongoDB
 *********************************************************/
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const shortUrlSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true,
    unique: true,
  },
  short: {
    type: String,
    required: true,
    unique: true,
  },
});

const ShortURL = mongoose.model('ShortURL', shortUrlSchema);

/* Express
 *********************************************************/
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

async function validateURL(url, callback) {
  try {
    const { hostname } = new URL(url);

    await dns.lookup(hostname);
  } catch (error) {
    callback({ error: 'invalid url' });
  }
}

app.post('/api/shorturl', async function (req, res) {
  const originalUrl = req.body.url;

  await validateURL(originalUrl, (error) => {
    res.json(error);
  });

  const shortUrl = shortid.generate();

  try {
    const data = await ShortURL.create({ original: originalUrl, short: shortUrl });

    res.json({ original_url: data.original, short_url: data.short });
  } catch (error) {
    if (error.code === 11000) {
      const data = await ShortURL.findOne({ original: originalUrl });

      res.json({ original_url: data.original, short_url: data.short });
    } else {
      throw error;
    }
  }
});

app.get('/api/shorturl/:shorturl', async function (req, res) {
  const data = await ShortURL.findOne({ short: req.params.shorturl });

  res.redirect(data.original);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
