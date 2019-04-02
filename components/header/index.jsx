import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const Header = ({
  leftIcon,
  title,
  rightIcon,
  onClickLeft,
  onClickRight
}) => (
  <div className="header-container">
    <span className="left-operation" onClick={onClickLeft}>{leftIcon}</span>
    <span className="title">{title}</span>
    <span className="right-operation" onClick={onClickRight}>{rightIcon}</span>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func
};

export default Header;
