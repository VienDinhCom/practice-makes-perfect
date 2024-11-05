const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');

dotenv.config();

const isProd = () => process.env.NODE_ENV === 'production';

/* MongoDB
 *********************************************************/
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
});

const User = mongoose.model('User', userSchema);

const exerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

/* Express
 *********************************************************/
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', async (req, res) => {
  const username = req.body.username.toLowerCase();

  let user = await User.findOne({ username });

  if (user) {
    res.json(user);
  } else {
    user = await User.create({ username });

    res.json(user);
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.post('/api/users/:_id/exercises', async (req, res, next) => {
  const user = await User.findById(req.body[':_id']);

  if (user) {
    const { description, duration, date } = req.body;

    console.log({
      username: user.username,
      description,
      duration: Number(duration),
      date: new Date(date || Date.now()),
    });

    const exercise = await Exercise.create({
      username: user.username,
      description,
      duration: Number(duration),
      date: new Date(date || Date.now()),
    });

    res.json(_.pick(exercise, ['_id', 'username', 'date', 'duration', 'description']));
  }
});

const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
