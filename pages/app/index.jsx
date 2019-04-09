import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.less';

import Home from '../home';
import Record from '../record';
import Setting from '../setting';
import InputModal from '../../components/input-modal';
import axios from 'axios';

function getTokenFromCookie () {
  const cookies = {};
  const cookeStringArr = document.cookie.split(';');
  cookeStringArr.forEach((cookie) => {
    const keyAndValue = cookie.split('=');
    cookies[keyAndValue[0]] = keyAndValue[1];
  });
  return cookies;
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getTokenFromCookie().dailyCheckToken;
    checkToken(token);
    console.log(token);
  });

  const checkToken = (token) => {

  };

  const handleLogin = async (e, value) => {
    const user = await axios.post('/api/user/login', { name: value });
    setUser(user);
  };

  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/record" component={Record}/>
        <Route path="/setting" component={Setting}/>
      </Switch>

      <InputModal
        visible={!user}
        title="请输入用户名"
        confirmText="输入用户名，登录或创建新的账号"
        rightText="登录 or 创建账号"
        clickRight={handleLogin}
      />
    </div>
  );
};

export default App;
