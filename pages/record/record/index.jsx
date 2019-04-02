import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.less';

import Header from '../../../components/header';
import NavTab from '../../../components/nav-tab';

import RecordPreview from '../record-preview';

const recordData = {
  checkCount: 2,
  checkItems: [{
    id: 1,
    name: '俯卧撑'
  }, {
    id: 2,
    name: '看书'
  }]
};

const Record = ({ history }) => {
  const defaultDate = new Date();
  const [date, setDate] = useState(defaultDate);

  const changeDate = (date) => {
    console.log(date);
    setDate(date);
  };

  const clickRecord = () => {
    history.push('/record/detail', {
      date
    });
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
          <RecordPreview recordData={recordData}/>
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
