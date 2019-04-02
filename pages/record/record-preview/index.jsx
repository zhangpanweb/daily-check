import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const RecordPreview = ({ recordData }) => {
  const checkItemsNames = recordData.checkItems.map(c => c.name);
  return (
    <div className="record-container">
      <span>今日总打卡数:{recordData.checkCount}</span>
      <span>打卡项：{checkItemsNames.join(',')}</span>
    </div>
  );
};
RecordPreview.propTypes = {
  recordData: PropTypes.object.isRequired
};

export default RecordPreview;
