const moment = require('moment');

const refrenceDate = {
  date: '1970-01-05',
  day: 1
};

function covertDateToDay (date) {
  const refrence = moment(refrenceDate.date);
  const targetDate = moment(date);
  const diff = targetDate.diff(refrence, 'days');

  let index = diff % 7;
  if (index < 0) index = -index;

  return refrenceDate.day + index;
}

const result = covertDateToDay('2006-04-02');

console.log('result', result);
