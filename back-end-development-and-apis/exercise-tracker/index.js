const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { z } = require('zod');

dotenv.config();

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
      date: exercise.date.toDateString(),
      duration: exercise.duration,
      description: exercise.description,
    });
  }
});

app.get('/api/users/:_id/logs', async (req, res) => {
  console.log({ query: req.query });

  const Query = z.object({
    from: z
      .string()
      .date()
      .default(new Date(0).toISOString().substring(0, 10))
      .transform((str) => new Date(str)),
    to: z
      .string()
      .date()
      .default(new Date(Date.now()).toISOString().substring(0, 10))
      .transform((str) => new Date(str)),
    limit: z
      .string()
      .default('0')
      .transform((str) => Number(str)),
  });

  const query = Query.parse(req.query);

  const user = await User.findById(req.params['_id']);

  if (user) {
    const count = await Exercise.countDocuments({ username: user.username });

    const exercises = await Exercise.find({
      username: user.username,
      date: { $gte: query.from, $lte: query.to },
    })
      .select('description duration date')
      .sort({ date: -1 })
      .limit(query.limit)
      .exec();

    res.json({
      _id: user._id,
      username: user.username,
      count,
      log: exercises.map(({ description, duration, date }) => ({
        description,
        duration,
        date: date.toDateString(),
      })),
    });
  }
});

const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
