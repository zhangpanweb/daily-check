import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.less';

import Home from '../home';
import Record from '../record';
import Setting from '../setting';
import Login from '../login';
import axios from 'axios';

const App = ({ history }) => {
  useEffect(() => {
    _checkToken();
  }, []);

  const _checkToken = async () => {
    try {
      await axios.get('/api/user');
    } catch (e) {
      history.push('/login');
      console.error('not login');
    }
  };

  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/record" component={Record}/>
        <Route path="/setting" component={Setting}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </div>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default withRouter(App);
