import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Record from './record';
import RecordDetail from './record-detail';
// import AddCheck from '../add-check';
// import Login from '../login';

const Router = ({ match }) => {
  console.log('match', match);
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Record}/>
      <Route path={`${match.path}/detail`} component={RecordDetail}/>
    </Switch>
  );
};

Router.propTypes = {
  match: PropTypes.object
};

export default withRouter(Router);
