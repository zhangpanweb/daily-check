import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import './style.less';

import Header from '../../../components/header';
import Journal from '../journal';

const data = {
  date: '2013-09-09',
  count: 2,
  journals: [{
    id: 1,
    checkItem: {
      id: 1,
      name: '俯卧撑'
    },
    content: '第一天，没有想象中那么困难'
  }, {
    id: 2,
    checkItem: {
      id: 1,
      name: '俯卧撑'
    },
    content: '第一天，没有想象中那么困难'
  }]
};

const RecordDetail = ({ history, location }) => {
  const [records, setRecords] = useState([]);
  const date = location.state.date;

  useEffect(() => {
    _getRecords();
  }, []);

  const handleGoBack = () => {
    history.go(-1);
  };

  const _getRecords = async () => {
    const res = await axios.get('/api/check_record/date', {
      params: { date }
    });
    const recordsWithJournal = res.data.filter(record => record.journal);
    setRecords(recordsWithJournal);
  };

  return (
    <div className="date-record-container">
      <Header title="打卡详情" leftIcon="<" onClickLeft={handleGoBack}/>
      <div className="header">
        <span>{moment(date).format('YYYY-MM-DD')}</span>
        <span className="count">{data.count}个</span>
      </div>
      <div className="journals">
        {records.map(record => {
          return <Journal key={record.id} content={record.journal} name={record.name}/>;
        })}
      </div>
    </div>
  );
};
RecordDetail.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(RecordDetail);
