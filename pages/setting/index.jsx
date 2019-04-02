import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import AddCheck from './add-check';
import Login from './login';
import Setting from './setting';

const Router = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Setting}/>
      <Route path={`${match.path}/add`} component={AddCheck}/>
      <Route path={`${match.path}/account`} component={Login}/>
    </Switch>
  );
};

Router.propTypes = {
  match: PropTypes.object
};

export default withRouter(Router);
