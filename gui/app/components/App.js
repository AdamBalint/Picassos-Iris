import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dismissSliderNotification, dismissPurchaseNotification } from '../actions/app';
import IrisNotification from '../components/iris-notification/IrisNotification';
import Nav from './nav/Nav';

require('./App.scss');

export class App extends Component {
  constructor(props) {
    super(props);
    this.renderSliderNotification = this.renderSliderNotification.bind(this);
    this.renderPurchaseNotification = this.renderPurchaseNotification.bind(this);
  }

  // For navigation
  getChildContext() {
    return {
      location: this.props.location,
    };
  }

  renderPurchaseNotification() {
    return (
      <IrisNotification
      display={this.props.showPurchaseNotification}
      onDismiss={this.props.dismissPurchaseNotification}
      onActionClick={this.props.dismissPurchaseNotification}
      message="Try this new style out by styling another image!"/>
    );
  }

  renderSliderNotification() {
    return (
      <IrisNotification display={this.props.showSliderNotification}
      onDismiss={this.props.dismissSliderNotification}
      onActionClick={this.props.dismissSliderNotification}
      message="You can set the intensity of the style by hovering over photo and adjusting the slider!"/>
    );
  }

  render() {
    return (
      <div className="app">
        <Nav/>
        { this.props.children }
        { this.renderSliderNotification() }
        { this.renderPurchaseNotification() }
      </div>
    );
  }
}

App.childContextTypes = {
  location: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    showSliderNotification: state.app.showSliderNotification,
    showPurchaseNotification: state.app.showPurchaseNotification,
  };
}

export default connect(mapStateToProps, { dismissSliderNotification, dismissPurchaseNotification })(App);
