import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.less';

import Header from '../../../components/header';
import NavTab from '../../../components/nav-tab';

const Setting = ({ history }) => {
  const handleAddCheck = () => {
    history.push('/setting/add');
  };

  const handleInterAccount = () => {
    history.push('/setting/account');
  };

  return (
    <div className="setting-container">

      <Header
        title="设置"
      />

      <div className="content">
        <span onClick={handleAddCheck}>
          添加
        </span>
        <span onClick={handleInterAccount}>
          账户
        </span>
      </div>

      <NavTab/>
    </div>
  );
};

Setting.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Setting);
