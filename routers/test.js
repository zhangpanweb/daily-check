const express = require('express');
const router = express.Router();

const knex = require('../database');

router.get('/a', async (req, res) => {
  const result = await knex.select().from('test');
  console.log('result', result);
  res.json(result);
});

module.exports = router;
