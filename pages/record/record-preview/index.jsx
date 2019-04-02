import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const RecordPreview = ({ recordData }) => {
  if (!recordData) return null;

  const itemNames = recordData.map(record => record.name).join(',');

  return (
    <div className="record-container">
      <span>今日总打卡数:{recordData.length}</span>
      <span>打卡项：{itemNames}</span>
    </div>
  );
};
RecordPreview.propTypes = {
  recordData: PropTypes.array
};

export default RecordPreview;
