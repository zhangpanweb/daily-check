import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const RecordPreview = ({ recordData }) => {
  if (!recordData) return null;

  return (
    <ul className="record-list-container">
      <span className="title">完成项</span>
      {
        recordData.map((data) => {
          return (
            <li key={data.checkItemId}>
              <span className="name">{data.name}</span>
              <img className="indicator" src="/static/images/checked-box.png"/>
            </li>
          );
        })
      }
    </ul>
  );
};

RecordPreview.propTypes = {
  recordData: PropTypes.array
};

export default RecordPreview;
