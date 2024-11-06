const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config();

/* MongoDB
 *********************************************************/
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
});

const User = mongoose.model('User', userSchema);

const exerciseSchema = new mongoose.Schema({
  userId: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

/* Express
 *********************************************************/
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', async (_req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  await User.syncIndexes();
  await Exercise.syncIndexes();
});

app.get('/api/users', async function (_req, res) {
  const users = await User.find();

  res.json(users);
});

app.post('/api/users', async function (req, res) {
  const user = await User.create({ username: req.body.username });

  res.json({ username: user.username, _id: user._id });
});

app.post('/api/users/:_id/exercises', async function (req, res) {
  const userId = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date || new Date().toISOString().substring(0, 10);

  const user = await User.findById(userId);

  const exercise = await Exercise.create({
    userId: user._id,
    username: user.username,
    description: description,
    duration: parseInt(duration),
    date: date,
  });

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: new Date(exercise.date).toDateString(),
    _id: user._id,
  });
});

app.get('/api/users/:_id/logs', async function (req, res) {
  const userId = req.params._id;
  const from = req.query.from || new Date(0).toISOString().substring(0, 10);
  const to = req.query.to || new Date(Date.now()).toISOString().substring(0, 10);
  const limit = Number(req.query.limit) || 0;

  const user = await User.findById(userId).exec();

  const exercises = await Exercise.find({
    userId: userId,
    date: { $gte: from, $lte: to },
  })
    .select('description duration date')
    .limit(limit)
    .exec();

  res.json({
    _id: user._id,
    username: user.username,
    count: exercises.length,
    log: exercises.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
      };
    }),
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
