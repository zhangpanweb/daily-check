import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const Habit = ({ habit }) => {
  return (
    <div className="habit-item-wrapper">
      <p className="name">
        {habit.name}
      </p>
      <p className="description">
        {habit.description}
      </p>
      {
        habit.isCompleted
          ? <p className="completed">
            completed
          </p> : null
      }
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
