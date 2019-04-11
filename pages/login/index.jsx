import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../../components/header';

import './style.less';

const Login = ({ history }) => {
  const [loginOrRegist, setLoginOrRegist] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginOrRegist = async () => {
    if (!username || !password) {
      setErrorMessage('请输入用户名和密码');
      return;
    }

    let result = '';
    if (loginOrRegist === 'login') {
      result = await axios.post('/api/user/login', {
        name: username,
        password
      });
    } else {
      result = await axios.post('/api/user/register', {
        name: username,
        password
      });
    }

    if (result.data !== 'ok') {
      setErrorMessage(result.data);
    } else {
      history.push('/');
    }
  };

  const hanldeUsernameInput = (e) => {
    setUsername(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const handleSwitchLoginAndRegist = () => {
    if (loginOrRegist === 'login') {
      setLoginOrRegist('regist');
    } else {
      setLoginOrRegist('login');
    }
  };

  return (
    <div className="login-container">
      <Header
        title="登录"
        rightIcon={loginOrRegist === 'regist' ? '登录' : '注册'}
        onClickRight={handleSwitchLoginAndRegist}
      />

      <div className="content-wrapper">
        <input className="username" placeholder="请输入账号" value={username} onChange={(e) => hanldeUsernameInput(e)}/>
        <input placeholder="请输入密码" value={password} onChange={(e) => handlePasswordInput(e)}/>
        <p className="tip">{errorMessage}</p>
        <button onClick={handleLoginOrRegist}>{loginOrRegist === 'regist' ? '注册' : '登录'}</button>
      </div>
    </div>

  );
};

Login.propTypes = {
  history: PropTypes.object
};

export default withRouter(Login);
