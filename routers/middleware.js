const jwt = require('jsonwebtoken');

module.exports = {
  auth
};

async function auth (req, res, next) {
  const token = req.cookies.dailyCheckToken;
  if (!token) {
    res.status(401).send({ message: 'to login' });
  }
  const decoded = jwt.verify(token, 'daily-check');
  console.log('decoded', decoded);
  next();
}
