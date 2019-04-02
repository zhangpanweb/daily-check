const express = require('express');
const router = express.Router();

const knex = require('../database');

router.post('/check_item', async (req, res) => {
  await knex('check_item').insert({
    ownerId: 1,
    name: 'push-up',
    description: 'a',
    journalMust: true
  });
  res.status(200).send('success');
});

module.exports = router;
