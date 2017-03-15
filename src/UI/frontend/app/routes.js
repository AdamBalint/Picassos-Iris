import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home/Home';
import Stylize from './components/stylize/Stylize';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/stylize" component={Stylize}/>
  </Route>
);