import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const BottomButton = ({ text, onClick }) => {
  return (
    <div className="bottom-button-container" onClick={onClick}>
      {text}
    </div>
  );
};

BottomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default BottomButton;
