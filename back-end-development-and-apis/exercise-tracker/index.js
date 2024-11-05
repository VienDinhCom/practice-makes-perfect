const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');

dotenv.config();

const isProd = () => process.env.NODE_ENV === 'production';
const formatDate = (date) => date.toString().split(' ').slice(0, 4).join(' ');

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
  const user = await User.findById(req.params['_id']);

  if (user) {
    const { description, duration, date } = req.body;

    const exercise = await Exercise.create({
      username: user.username,
      description,
      duration: Number(duration),
      date: new Date(date || Date.now()),
    });

    res.json({
      _id: user._id,
      username: user.username,
      date: formatDate(exercise.date),
      duration: exercise.duration,
      description: exercise.description,
    });
  }
});

app.get('/api/users/:_id/logs', async (req, res) => {
  const user = await User.findById(req.params['_id']);

  if (user) {
    const count = await Exercise.countDocuments();
    const exercises = await Exercise.find().sort({ date: -1 }).select('description duration date').exec();

    console.log(user);

    res.json({
      _id: user._id,
      username: user.username,
      count,
      log: exercises.map(({ description, duration, date }) => ({
        description,
        duration,
        date: formatDate(date),
      })),
    });
  }
});

const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
