import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.less';

import Home from '../home';
import Record from '../record';
import Setting from '../setting';

const App = () => {
  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/record" component={Record}/>
        <Route path="/setting" component={Setting}/>
      </Switch>
    </div>
  );
};

export default App;
