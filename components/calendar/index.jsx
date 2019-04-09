import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

import './style.less';

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

const Calendar = ({ value = new Date(), onChangeDate }) => {
  const [selectedDate, setSelectedDate] = useState(parseInt(moment(value).format('DD'), 10));
  const [selectedMonth, setSelectedMonth] = useState(moment(value).format('YYYY-MM-DD'));
  const [monthDates, setMonthDates] = useState([]);

  useEffect(() => {
    formatDates();
  }, [selectedMonth]);

  const formatDates = () => {
    const dates = [];
    const firstDateOfMonth = moment(selectedMonth).startOf('month').format('YYYY-MM-DD');
    const firstDay = covertDateToDay(firstDateOfMonth);

    const lastDateNumberOfMonth = moment(selectedMonth).endOf('month').format('DD');
    const lastDateOfMonth = moment(selectedMonth).endOf('month').format('YYYY-MM-DD');
    const lastDay = covertDateToDay(lastDateOfMonth);

    /** [1,2,3,4,...,30] */
    for (let i = 1; i <= lastDateNumberOfMonth; i++) {
      dates.push(i);
    }

    /** 补充前一个月和后一个月的空白部分 */
    for (let i = firstDay; i > 1; i--) {
      dates.unshift(undefined);
    }
    for (let i = lastDay; i < 7; i++) {
      dates.push(undefined);
    }

    setMonthDates(dates);
  };

  /** 处理各类交互 */
  const handleSelectPreMonth = () => {
    const lastMonth = moment(selectedMonth).add(-1, 'months');
    setSelectedMonth(lastMonth);
  };

  const handleSelectNextMonth = () => {
    const nextMonth = moment(selectedMonth).add(1, 'months');
    setSelectedMonth(nextMonth);
  };

  const handleSelectedDate = (date) => {
    if (date) {
      setSelectedDate(date);

      const fomatedDate = `${moment(selectedMonth).format('YYYY-MM').toString()}-${date}`;
      onChangeDate(moment(fomatedDate).format('YYYY-MM-DD'));
    }
  };

  let key = 1;
  return (
    <div className="calendar-container">
      <div className="title">
        <img src="/static/images/calendar-left.png" onClick={handleSelectPreMonth}/>
        <span>日期</span>
        <img src="/static/images/calendar-right.png" onClick={handleSelectNextMonth}/>
      </div>

      <div className="day">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>

      <div className="date">
        {monthDates.map(date => {
          let className = 'cell';
          if (date === selectedDate) {
            className = 'cell selected';
          }
          return (
            <span className={className} key={key++} onClick={() => { handleSelectedDate(date); }}>{date}</span>
          );
        })}
      </div>

    </div>
  );
};

Calendar.propTypes = {
  value: propTypes.oneOfType([propTypes.object, propTypes.string]),
  onChangeDate: propTypes.func
};

export default Calendar;
