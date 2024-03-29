const jwt = require('jsonwebtoken');

module.exports = {
  auth
};

const notCheckUrl = [
  '/api/user/login',
  '/api/user/register'
];

async function auth (req, res, next) {
  const path = req.path;
  if (notCheckUrl.indexOf(path) !== -1 || !path.match(/^(\/api)/)) {
    await next();
    return;
  }

  const token = req.cookies.dailyCheckToken;
  console.log('token', token);
  if (token) {
    const decoded = jwt.verify(token, 'daily-check');
    if (decoded.id && decoded.name) {
      req.user = decoded;
      await next();
      return;
    }
  }

  res.status(403).end('to login');
}
