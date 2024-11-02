const cors = require('cors');
const express = require('express');
const { isNotDate, convertDate } = require('./utils/date');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// My API endpoints
app.get('/api', function (req, res) {
  const date = new Date();

  res.json(convertDate(date));
});

app.get('/api/:date', function (req, res) {
  let date = new Date(req.params.date);

  if (isNotDate(date)) {
    date = new Date(parseInt(req.params.date));
  }

  if (isNotDate(date)) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json(convertDate(date));
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
