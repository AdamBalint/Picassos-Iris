import React, { Component } from 'react';
import IrisNotification from '../components/iris-notification/IrisNotification';
import Nav from './nav/Nav';

require('./App.scss');

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shownPurchaseNotification: false,
      showSliderNotification: false,
      haventShownPurchaseNotification: true,
      haventShownSliderNotification: true,
    };

    this.renderSliderNotification = this.renderSliderNotification.bind(this);
    this.dismissSliderNotification = this.dismissSliderNotification.bind(this);
    this.displayPurchaseNotification = this.displayPurchaseNotification.bind(this);
    this.dismissPurchaseNotification = this.dismissPurchaseNotification.bind(this);
    this.displaySliderNotification = this.displaySliderNotification.bind(this);
    this.renderPurchaseNotification = this.renderPurchaseNotification.bind(this);
  }

  dismissSliderNotification() {
    this.setState({
      showSliderNotification: false,
    });
  }

  dismissPurchaseNotification() {
    this.setState({
      showPurchaseNotification: false,
    });
  }

  getChildContext() {
    return {
      location: this.props.location,
    };
  }

  renderPurchaseNotification() {
    return (
      <IrisNotification
      display={this.state.showPurchaseNotification}
      onActionClick={this.dismissPurchaseNotification}
      message="Try this new style out by styling another image!"/>
    );
  }

    renderSliderNotification() {
    return (
      <IrisNotification display={this.state.showSliderNotification} 
      onActionClick={this.dismissSliderNotification}
      message="You can set the intensity of the style by hovering over photo and adjusting the slider!"/>
    );
  }
  
  displaySliderNotification() {
    this.setState({
      showSliderNotification: true,
      haventShownSliderNotification: false,
    });
  }

  displayPurchaseNotification() {
    this.setState({
      showPurchaseNotification: true,
      haventShownPurchaseNotification: false,
    });
  }

  getChildrenWithProps(children) {
    return children.map(this.props.children,
      (child) => React.cloneElement(child, {
        showPurchaseNotification: this.state.showPurchaseNotification,
        showSliderNotification: this.state.showSliderNotification,
        haventShownPurchaseNotification: this.state.haventShownPurchaseNotification,
        haventShownSliderNotification: this.state.haventShownSliderNotification,
        displayPurchaseNotification: this.displayPurchaseNotification,
        displaySliderNotification: this.displaySliderNotification,
        dismissPurchaseNotification: this.dismissPurchaseNotification,
        dismissSliderNotification: this.dismissSliderNotification,
      }));
  }

  render() {
    const childrenWithProps = this.getChildrenWithProps(React.Children);

    return (
      <div className="app">
        <Nav isBackButtonVisible={this.state.isBackButtonVisible} backLink={this.state.backLink}/>
        { childrenWithProps }
        { this.renderPurchaseNotification() }
        { this.renderSliderNotification() }
      </div>
    );
  }
}

App.childContextTypes = {
  location: React.PropTypes.object,
};

export default App;
