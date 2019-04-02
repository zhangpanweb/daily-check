const express = require('express');
const router = express.Router();
const moment = require('moment');
const _ = require('lodash');

const knex = require('../database');

router.get('/check_record/today', async (req, res) => {
  try {
    const userId = 1;
    const records = await knex('checkRecord').select().where({
      ownerId: userId,
      date: moment().format('YYYY-MM-DD')
    });

    const checkItems = await knex('checkItem').select().where({
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

    await knex('checkRecord').insert({
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

router.get('/check_record/month', async (req, res) => {
  try {
    const userId = 1;
    const month = req.query.month || new Date();

    const firstDayOfMonth = moment(month).startOf('month').format('YYYY-MM-DD');
    const lastDayOfMonth = moment(month).endOf('month').format('YYYY-MM-DD');

    let records = await knex('checkRecord').select()
      .join('checkItem', 'checkRecord.checkItemId', '=', 'checkItem.id')
      .where('checkRecord.date', '>=', firstDayOfMonth)
      .andWhere('checkRecord.date', '<=', lastDayOfMonth)
      .andWhere({ 'checkRecord.ownerId': userId });

    records = records.map(record => {
      record.date = moment(record.date).format('YYYY-MM-DD');
      return _.pick(record, ['checkItemId', 'date', 'name']);
    });

    const groupedRecords = _.groupBy(records, (record) => record.date);

    res.status(200).json(groupedRecords);
  } catch (e) {
    console.log(e);
    res.status(502).send(e.message);
  }
});

router.get('/check_record/date', async (req, res) => {
  try {
    const userId = 1;
    const date = req.query.date || new Date();

    const records = await knex('checkRecord').select()
      .join('checkItem', 'checkRecord.checkItemId', '=', 'checkItem.id')
      .where('checkRecord.date', moment(date).format('YYYY-MM-DD'))
      .andWhere('checkRecord.ownerId', userId);

    res.status(200).json(records);
  } catch (e) {
    console.log(e);
    res.status(502).send(e.message);
  }
});

module.exports = router;
