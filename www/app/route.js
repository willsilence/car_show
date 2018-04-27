import { Router, Route } from 'dva/router';
import App from "./containers/App.js";
import React from 'react';

export default ({ history }) => {
  return (
    <Router history={history}>
      	<Route path="/" component={App} />
    </Router>
  );
}