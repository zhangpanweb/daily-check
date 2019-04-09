import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const Habit = ({ habit }) => {
  const completedImg = <i className="iconfont icon-check-circle"></i>;
  const notCompletedImg = <i className="iconfont icon-close-circle"></i>;

  return (
    <div className="habit-item-wrapper">

      { habit.isCompleted ? completedImg : notCompletedImg }

      <p className="name">
        {habit.name}
      </p>

    </div>
  );
};

Habit.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  })
};

export default Habit;
