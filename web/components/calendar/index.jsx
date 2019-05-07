import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import cname from 'classnames';

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

const Calendar = ({ value = new Date(), onChangeDate }) => {
  const nowDate = parseInt(moment().format('DD'), 10);

  const [selectedDate, setSelectedDate] = useState(parseInt(moment(value).format('DD'), 10)); // 被选中的这个月的第几天，类型为数字
  const [selectedMonth, setSelectedMonth] = useState(moment(value).format('YYYY-MM')); // 被选中的月份，格式为 YYYY-MM
  const [monthDates, setMonthDates] = useState([]); // 日历上需要展示的这个月的天数组成的数组

  useEffect(() => {
    _formatDates();
  }, [selectedMonth]);

  /** 处理各类交互 */
  const handleSelectPreMonth = () => {
    const lastMonth = moment(selectedMonth).add(-1, 'months').format('YYYY-MM');
    setSelectedMonth(lastMonth);
  };

  const handleSelectNextMonth = () => {
    if (moment().diff(selectedMonth, 'M') === 0) {
      return;
    }

    const nextMonth = moment(selectedMonth).add(1, 'months').format('YYYY-MM');
    setSelectedMonth(nextMonth);
  };

  const handleSelectedDate = (date) => {
    if (!date.clickable) {
      return;
    }

    if (date) {
      setSelectedDate(date.d);

      const fomatedDate = `${moment(selectedMonth).format('YYYY-MM').toString()}-${date.d}`;
      onChangeDate(moment(fomatedDate, 'YYYY-MM-D').format('YYYY-MM-DD').toString());
    }
  };

  const _formatDates = () => {
    const dates = [];
    const firstDateOfMonth = moment(selectedMonth).startOf('month').format('YYYY-MM-DD');
    const firstDay = covertDateToDay(firstDateOfMonth);

    const lastDateNumberOfMonth = moment(selectedMonth).endOf('month').format('DD');
    const lastDateOfMonth = moment(selectedMonth).endOf('month').format('YYYY-MM-DD');
    const lastDay = covertDateToDay(lastDateOfMonth);

    /** [1,2,3,4,...,30] */
    for (let i = 1; i <= lastDateNumberOfMonth; i++) {
      if (moment().diff(selectedMonth, 'M') > 0) {
        dates.push({ d: i, clickable: true });
      } else {
        if (nowDate < i) {
          dates.push({ d: i, clickable: false });
        } else {
          dates.push({ d: i, clickable: true });
        }
      }
    }

    /** 补充前一个月和后一个月的空白部分 */
    for (let i = firstDay; i > 1; i--) {
      dates.unshift({});
    }
    for (let i = lastDay; i < 7; i++) {
      dates.push({});
    }

    setMonthDates(dates);
  };

  return (
    <div className="calendar-container">
      <div className="title">
        <i className="iconfont icon-left" onClick={handleSelectPreMonth}></i>
        <span>{moment(selectedMonth).format('YYYY-MM')}</span>
        <i
          className={cname('iconfont', 'icon-right', { 'unclickable': moment().diff(selectedMonth, 'M') <= 0 })}
          onClick={handleSelectNextMonth}
        ></i>
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
        {monthDates.map((date, index) => (
          <span
            className={cname('cell', { 'selected': date.d === selectedDate, 'unclickable': date.d && !date.clickable })}
            key={index}
            onClick={() => { handleSelectedDate(date); }}
          >{date.d}</span>
        ))}
      </div>

    </div>
  );
};

Calendar.propTypes = {
  value: propTypes.string,
  onChangeDate: propTypes.func
};

export default Calendar;
