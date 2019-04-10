const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./routers');
const middleware = require('./routers/middleware');

const app = express();
const PORT = process.env.PORT || '3100';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

// db.prepare();
app.use(middleware.auth);
app.use(router);

app.get('/*', async (req, res) => {
  const page = fs.readFileSync('./dist/index.html');
  res.end(page);
});

app.listen(PORT, () => {
  console.log(`Server has been listening on ${PORT}`);
});
