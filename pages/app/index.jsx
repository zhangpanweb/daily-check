import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.less';

import Home from '../home';
import Record from '../record';
import Setting from '../setting';
import InputModal from '../../components/input-modal';
import axios from 'axios';

const App = ({ history }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    _checkToken();
  }, []);

  const _checkToken = async () => {
    try {
      const user = await axios.get('/api/user');
      setUser(user);
    } catch (e) {
      setUser(null);
      console.error('not login');
    }
  };

  const handleLogin = async (e, value) => {
    const user = await axios.post('/api/user/login', { name: value });
    setUser(user);
    history.go(0);
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

App.propTypes = {
  history: PropTypes.object
};

export default withRouter(App);
