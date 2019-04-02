import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.less';

const NavTab = () => {
  return (
    <div className="nav-tab-container">
      <NavLink activeClassName="selected" to="/">
        <span>打卡</span>
      </NavLink>
      <NavLink activeClassName="selected" to="/record">
        <span>成就</span>
      </NavLink>
      <NavLink activeClassName="selected" to="/setting">
        <span>设置</span>
      </NavLink>
    </div>
  );
};

export default NavTab;
