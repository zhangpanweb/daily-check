import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

import './style.less';

// function getDaysOfMonth (year, month) {
//   const intYear = parseInt(year, 10);
//   const intMonth = parseInt(month, 10);
//   if ([1, 3, 5, 7, 8, 10, 12].indexOf(intMonth) !== -1) {
//     return 31;
//   } else if (intMonth === 2) {
//     if (intYear % 4 === 0) return 28;
//     return 29;
//   } else {
//     return 30;
//   }
// }

const Calendar = ({ value = new Date() }) => {
  value = '2016-03-20';
  const firstDayOfMonth = moment(value).startOf('month').format('YYYY-MM-DD');
  const lastDayOfMonth = moment(value).endOf('month').format('DD');
  const lastDateOfMonth = moment(value).endOf('month').format('YYYY-MM-DD');
  let lastDayOfLastMonth = moment(value).add(-1, 'months').endOf('month').format('DD');
  const firstDay = covertDateToDay(firstDayOfMonth);
  const lastDay = covertDateToDay(lastDateOfMonth);

  let dates = [];
  let index = 1;

  for (let i = 1; i <= lastDayOfMonth; i++) {
    dates.push(i);
  }
  for (let i = firstDay; i > 1; i--) {
    dates.unshift(lastDayOfLastMonth--);
  }
  for (let i = lastDay; i < 7; i++) {
    dates.push(index++);
  }

  let key = 1;
  return (
    <div className="calendar-container">
      <div className="title">
        <span>{'<<'}</span>
        <span>{'<'}</span>
        <span>日期</span>
        <span>{'>'}</span>
        <span>{'>>'}</span>
      </div>

      <div className="date">
        {dates.map(date => {
          return (
            <span className="cell" key={key++}>{date}</span>
          );
        })}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  value: propTypes.object
};

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

export default Calendar;
