const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { formidable } = require('formidable');

dotenv.config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', async (req, res) => {
  const form = formidable();

  const [_fields, files] = await form.parse(req);

  const file = files.upfile[0];

  res.json({
    name: file.originalFilename,
    type: file.mimetype,
    size: file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
