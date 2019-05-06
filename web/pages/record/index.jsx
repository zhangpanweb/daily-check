import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Record from './record';

const Router = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Record}/>
    </Switch>
  );
};

Router.propTypes = {
  match: PropTypes.object
};

export default withRouter(Router);
