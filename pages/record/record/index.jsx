import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
import Calendar from '../../../components/calendar';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import './style.less';

import Header from '../../../components/header';
import NavTab from '../../../components/nav-tab';

import RecordPreview from '../record-preview';

const Record = ({ history }) => {
  const defaultDate = new Date();
  const [date, setDate] = useState(defaultDate);
  const [records, setRecords] = useState({});

  useEffect(() => {
    _getRecords();
  }, []);

  const changeDate = (date) => {
    setDate(date);
  };

  const clickRecord = () => {
    history.push('/record/detail', {
      date
    });
  };

  const _getRecords = async () => {
    const res = await axios.get('/api/check_record/month');
    setRecords(res.data);
  };

  return (
    <div className="setting-container">
      <Header
        title="Setting"
      />

      <div className="content-wrapper">
        <Calendar
          onChange={changeDate}
          value={date}
        />

        <div className="record-area" onClick={clickRecord}>
          <RecordPreview recordData={records[moment(date).format('YYYY-MM-DD')]}/>
        </div>

      </div>
      <NavTab/>
    </div>
  );
};
Record.propTypes = {
  history: PropTypes.object
};

export default withRouter(Record);
