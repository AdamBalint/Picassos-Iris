import React from 'react';
import ReactDOM from 'react-dom';

require('../assets/vendor/normalize.min.css');
require('../assets/fonts/font-Gotham/gotham.scss');

import Nav from './components/nav/Nav';
import Home from './components/home/Home';


/**
 * This file is meant to render the application onto the webview
 * It is the entry point for the front-end and webpack
 */


/**
 * Root component to be rendered
 */
const App = function() {
  return (
    <div>
      <Nav/>
      <Home/>
    </div>
  )
}


const root = document.getElementById('root');
ReactDOM.render(<App/>, root);
