import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const Habit = ({ habit }) => {
  const completedImg = <img className="indicator" src="/static/images/check-circle.png"/>;
  const notCompletedImg = <img className="indicator" src="/static/images/close-circle.png"/>;

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
    description: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  })
};

export default Habit;
