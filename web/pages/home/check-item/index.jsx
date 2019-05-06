import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const CheckItem = ({ checkItem }) => {
  const completedImg = <i className="iconfont icon-check-circle"></i>;
  const notCompletedImg = <i className="iconfont icon-close-circle"></i>;

  return (
    <div className="check-item-container">

      { checkItem.isCompleted ? completedImg : notCompletedImg }

      <p className="name">
        {checkItem.name}
      </p>

    </div>
  );
};

CheckItem.propTypes = {
  checkItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  })
};

export default CheckItem;
