import React, { Component } from 'react';
import { irisLogo, cartIcon } from '../../util/Icons';

require('./nav.scss');

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav">
          <div className="nav__logo">
            <div className="nav__logo-container dim">
              <img className="nav__logo-img" src={irisLogo}></img>
              <span className="nav__text">iris</span>
            </div>
          </div>
          <img className="nav__cart dim" src={cartIcon}></img>
      </nav>
    )
  }
}
