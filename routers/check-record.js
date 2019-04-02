const express = require('express');
const router = express.Router();
const moment = require('moment');

const knex = require('../database');

router.get('/check_record/today', async (req, res) => {
  try {
    const userId = 1;
    const records = await knex('check_record').select().where({
      ownerId: userId,
      date: moment().format('YYYY-MM-DD')
    });

    const checkItems = await knex('check_item').select().where({
      ownerId: userId
    });

    const todayCheck = checkItems.map(item => {
      item.isCompleted = !!(records.find(record => record.checkItemId === item.id));
      return item;
    });

    res.status(200).json(todayCheck);
  } catch (e) {
    console.error(e);
  }
});

router.post('/check_record', async (req, res) => {
  try {
    const userId = 1;
    const { checkItemId } = req.body;

    await knex('check_record').insert({
      ownerId: userId,
      checkItemId,
      date: moment().format('YYYY-MM-DD')
    });
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(502).send(e.message);
  }
});

module.exports = router;
