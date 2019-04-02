const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = require('./routers');

const app = express();
const PORT = process.env.PORT || '3100';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

// db.prepare();

app.use(router);

app.get('/*', async (req, res) => {
  const page = fs.readFileSync('./views/index.html');
  res.end(page);
});

app.listen(PORT, () => {
  console.log(`Server has been listening on ${PORT}`);
});
