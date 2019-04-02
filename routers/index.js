const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const checkItemRouter = require('./check-item');
const checkRecordRouter = require('./check-record');

router.use('/api',
  userRouter,
  checkItemRouter,
  checkRecordRouter
);

module.exports = router;
