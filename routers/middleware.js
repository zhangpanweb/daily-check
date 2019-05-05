const jwt = require('jsonwebtoken');

module.exports = {
  auth
};

const notCheckUrl = [
  '/api/user/login',
  '/api/user/register',
  '/login'
];

async function auth (req, res, next) {
  const path = req.path;
  if (notCheckUrl.indexOf(path) !== -1) {
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

  res.redirect('/login');
}
