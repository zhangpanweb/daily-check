const express = require('express');
const router = express.Router();

const knex = require('../database');

router.post('/check_item', async (req, res) => {
  const params = req.body;
  const result = await knex('check_item').insert(params);
  const id = result[0];
  const checkItem = await knex('check_item').select().where({ id });
  res.status(200).json(checkItem[0]);
});

module.exports = router;
