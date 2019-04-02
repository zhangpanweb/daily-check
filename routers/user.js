const express = require('express');
const router = express.Router();

const knex = require('../database');

router.get('/b', async (req, res) => {
  const result = await knex.select().from('check_item');
  console.log('result', result);
  res.json(result);
});

module.exports = router;
