import React, { Component } from 'react';
import { Notification } from 'react-notification';

export default class IrisNotification extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Notification
        isActive={this.props.display}
        action="Okay, got it"
        onClick={this.props.onActionClick}
        dismissAfter={3000}
        onDismiss={this.props.onDismiss}
        actionStyle={{
          color: 'white',
        }}
        message={this.props.message}
      />
    );
  }

}
