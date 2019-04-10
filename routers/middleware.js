const jwt = require('jsonwebtoken');

module.exports = {
  auth
};

const notCheckUrl = [
  '/api/user/login'
];

async function auth (req, res, next) {
  const path = req.path;
  if (notCheckUrl.indexOf(path) !== -1) {
    await next();
    return;
  }

  const token = req.cookies.dailyCheckToken;
  if (token) {
    const decoded = jwt.verify(token, 'daily-check');
    if (decoded.id && decoded.name) {
      req.user = decoded;
      await next();
      return;
    }
  }

  res.status(401).send({ message: 'to login' });
}
