import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.less';

import Header from '../../../components/header';
// import BottomButton from '../../../components/bottom-button';

const Login = ({ history }) => {
  const goBack = () => {
    history.go(-1);
  };

  // const handleLogin = () => {
  //   console.log('successfully login');
  // };

  return (
    <div className="login-container">
      <Header
        title="账号"
        leftIcon="<"
        onClickLeft={goBack}
      />

      <div className="account-input">
        <input placeholder="请输入账号"/>
      </div>

      {/* <BottomButton
        text="创建账号 or 登录"
        onClick={handleLogin}
      /> */}
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Login);
