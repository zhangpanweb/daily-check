import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const Header = ({
  leftIcon,
  title,
  rightIcon,
  onClickLeftOp,
  onClickRightOp
}) => (
  <div className="header-container">
    <span className="left-operation" onClick={onClickLeftOp}>{leftIcon}</span>
    <span className="title">{title}</span>
    <span className="right-operation" onClick={onClickRightOp}>{rightIcon}</span>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClickLeftOp: PropTypes.func,
  onClickRightOp: PropTypes.func
};

export default Header;
