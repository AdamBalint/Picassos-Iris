import React, { Component } from 'react';
import { Notification } from 'react-notification';
import Nav from './nav/Nav';

require('./App.scss');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      isBackButtonVisible: false,
      backLink: '',
      displayNotification: false,
      notificationMessage: '',
    };

    this.isBackButtonVisible = this.isBackButtonVisible.bind(this);
    this.setCurrentPageIndex = this.setCurrentPageIndex.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.dismissNotification = this.dismissNotification.bind(this);
    this.displayNotificationWithMessage = this.displayNotificationWithMessage.bind(this);
    this.setBackLink = this.setBackLink.bind(this);
  }

  isBackButtonVisible(visible) {
    this.setState({
      isBackButtonVisible: visible,
    });
  }

  setBackLink(link) {
    this.setState({
      backLink: link,
    });
  }

  setCurrentPageIndex(index) {
    this.setState({
      currentPageIndex: index,
    });
  }

  displayNotificationWithMessage(message) {
    this.setState({
      displayNotification: true,
      notificationMessage: message,
    });
  }

  dismissNotification() {
    this.setState({
      displayNotification: false,
    });
  }

  renderNotification() {
    return (
      <Notification
        isActive={this.state.displayNotification}
        action="Okay, got it"
        onClick={this.dismissNotification}
        actionStyle={{
          color: 'white',
        }}
        message={this.state.notificationMessage}
      />
    );
  }

  getChildrenWithProps(children) {
    return children.map(this.props.children,
      (child) => React.cloneElement(child, {
        setCurrentPageIndex: this.setCurrentPageIndex,
        currentPageIndex: this.state.currentPageIndex,
        isBackButtonVisible: this.isBackButtonVisible,
        displayNotificationWithMessage: this.displayNotificationWithMessage,
        dismissNotification: this.dismissNotification,
        setBackLink: this.setBackLink,
      }));
  }

  render() {
    const childrenWithProps = this.getChildrenWithProps(React.Children);

    return (
      <div className="app">
        <Nav isBackButtonVisible={this.state.isBackButtonVisible} backLink={this.state.backLink}/>
        { childrenWithProps }
        { this.renderNotification() }
      </div>
    );
  }
}
