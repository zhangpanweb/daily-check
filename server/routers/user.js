const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');

const knex = require('../database');

router.post('/user/login', async (req, res) => {
  const { name, password } = req.body;
  const result = await knex('user').select().where({ name });
  const user = result[0];

  if (!user) {
    res.status(200).json({ message: '用户名不存在' });
    return;
  }

  const validate = sha1(`${JSON.stringify({ name, password })}dailyCheck`) === user.password;

  if (!validate) {
    res.status(200).json({ message: '密码错误' });
    return;
  }

  const token = jwt.sign(user, 'daily-check');
  res.cookie('dailyCheckToken', token);

  res.status(200).json({ responseStatus: 'ok' });
});

router.post('/user/register', async (req, res) => {
  const { name, password } = req.body;

  const result = await knex('user').select().where({ name });
  const existedUser = result[0];
  if (existedUser) {
    res.status(200).send({ message: '用户名已被占用' });
    return;
  }

  let encryptedPassword = sha1(`${JSON.stringify({ name, password })}dailyCheck`);
  const createdResult = await knex('user').insert({ name, password: encryptedPassword });
  const newUserArr = await knex('user').select().where({ id: createdResult[0] });
  const newUser = newUserArr[0];

  const token = jwt.sign(newUser, 'daily-check');
  res.cookie('dailyCheckToken', token);

  res.status(200).send({ responseStatus: 'ok' });
});

router.get('/user', async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

module.exports = router;
