import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Setting from './setting';

const Router = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Setting}/>
    </Switch>
  );
};

Router.propTypes = {
  match: PropTypes.object
};

export default withRouter(Router);
