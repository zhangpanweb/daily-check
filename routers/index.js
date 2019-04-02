const express = require('express');
const router = express.Router();
const testRotuer = require('./test');
const userRouter = require('./user');

router.use('/api',
  testRotuer,
  userRouter
);

module.exports = router;
