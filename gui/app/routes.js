import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home/Home';
import Stylize from './components/stylize/Stylize';
import LoadingResult from './components/loading-result/LoadingResult';
import Finish from './components/finish/Finish';
import Shop from './components/shop/Shop';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/stylize" component={Stylize}/>
    <Route path="/loading-result" component={LoadingResult} />
    <Route path="/finish" component={Finish} />
    <Route path="/shop" component={Shop} />
  </Route>
);
