import React, { Component } from 'react';
import { Link } from 'react-router';
import { backIcon, irisLogo, cartIcon } from '../../util/Icons';

require('./nav.scss');

export default class Nav extends Component {
  renderBackButton(props) {
    return (
      <Link to={props.backLink}>
        <img className="nav__back dim" src={backIcon}></img>
      </Link>
    );
  }

  render() {
    return (
      <nav className="nav">
          {this.props.isBackButtonVisible ? this.renderBackButton(this.props) : ''}
          <div className="nav__logo">
            <div className="nav__logo-container dim">
              <img className="nav__logo-img" src={irisLogo}></img>
              <span className="nav__text">iris</span>
            </div>
          </div>
          <Link to='/shop'>
            <img className="nav__cart dim" src={cartIcon}></img>
          </Link>
      </nav>
    );
  }
}
