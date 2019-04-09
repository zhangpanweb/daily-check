import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.less';

const NavTab = () => {
  return (
    <div className="nav-tab-container">
      <NavLink activeClassName="selected" exact to="/">
        <i className="iconfont icon-check-square"></i>
        <span>打卡</span>
      </NavLink>
      <NavLink activeClassName="selected" to="/record">
        <i className="iconfont icon-calendar-check"></i>
        <span>成就</span>
      </NavLink>
    </div>
  );
};

export default NavTab;
