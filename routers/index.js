const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const checkItemRouter = require('./check-item');

router.use('/api',
  userRouter,
  checkItemRouter
);

module.exports = router;
