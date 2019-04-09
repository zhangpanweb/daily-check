const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const knex = require('../database');

router.post('/user/login', async (req, res) => {
  const name = req.body.name;
  const result = await knex('user').select().where({ name });
  let user = result[0];
  console.log('result', user);

  if (!user) {
    const result = await knex('user').insert({ name });
    const id = result[0];
    user = await knex('user').select().where({ id });
  }

  const token = jwt.sign(user, 'daily-check');
  res.cookie('dailyCheckToken', token);

  res.status(200).send('ok');
});

module.exports = router;
