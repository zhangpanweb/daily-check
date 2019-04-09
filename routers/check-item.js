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

router.put('/check_item/:id', async (req, res) => {
  const checkItemId = req.params.id;
  const params = req.body;

  await knex('checkItem').where('id', '=', checkItemId).update(params);
  res.status(200).send('ok');
});

router.get('/check_item/:userId', async (req, res) => {
  const userId = req.params.userId;

  const checkItems = await knex('checkItem').select().where({
    ownerId: userId,
    enabled: 1
  });
  res.status(200).json(checkItems);
});

module.exports = router;
