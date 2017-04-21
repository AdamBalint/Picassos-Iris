import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { backIcon, irisLogo, cartIcon } from '../../util/Icons';

require('./nav.scss');

export class Nav extends Component {

  constructor(props) {
    super(props);
    this.shouldBackButtonBeVisible = this.shouldBackButtonBeVisible.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.renderBackButton = this.renderBackButton.bind(this);
  }

  onBackButtonClick() {
    let { pathname } = this.context.location;
    if (pathname == '/stylize') {
      browserHistory.push('/');
    } else if (pathname == '/finish') {
      browserHistory.push('/stylize');
    } else {
      browserHistory.goBack();
    }
  }

  renderBackButton(props) {
    return (
      <Link onClick={() => { this.onBackButtonClick(); }}>
        <img className="nav__back dim" src={backIcon}></img>
      </Link>
    );
  }

  shouldBackButtonBeVisible() {
    let { pathname } = this.context.location;
    return (pathname == '/shop') || (pathname == '/stylize') || (pathname == '/finish');
  }

  render() {
    return (
      <nav ref="navbar" className="nav">
          {this.shouldBackButtonBeVisible() ? this.renderBackButton(this.props) : ''}
          <div className="nav__logo">
            <div className="nav__logo-container dim">
              <img className="nav__logo-img" src={irisLogo}></img>
              <span className="nav__text">iris</span>
            </div>
        </div>
          <Link to="/shop">
            <img className="nav__cart dim" src={cartIcon}></img>
          </Link>
      </nav>
    );
  }
}

Nav.contextTypes = {
  location: React.PropTypes.object,
};

export default Nav;
