const express = require('express');
const router = express.Router();

const knex = require('../database');

router.post('/check_item', async (req, res) => {
  const params = req.body;
  params.ownerId = 1;
  const result = await knex('checkItem').insert(params);
  const id = result[0];
  const checkItem = await knex('checkItem').select().where({ id });
  res.status(200).json(checkItem[0]);
});

router.get('/check_item/:userId', async (req, res) => {
  const userId = req.params.userId;

  const checkItems = await knex('checkItem').select().where({ ownerId: userId });
  res.status(200).json(checkItems);
});

module.exports = router;
