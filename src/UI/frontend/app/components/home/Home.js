import React, { Component } from 'react';
import Filepicker from '../filepicker/Filepicker';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./home.scss');

export class Home extends Component {

  constructor(props) {
    super(props);
    this.renderContinueButton = this.renderContinueButton.bind(this);
  }

  renderContinueButton() {
    if (this.props.isFileSelected) {
      return (
          <button className="btn btn--continue bg-animate hover-bg-black hover-white grow">
            <Link to="/stylize">Continue</Link>
          </button>
      );
    }

    return '';
  }

  render() {
    return (
      <div className="container">
          <Filepicker/>
          { this.renderContinueButton() }
      </div>
    );
  }

}

function mapStateToProps({filepicker}) {
  return {
    isFileSelected: filepicker.isFileSelected,
  };
}

export default connect(mapStateToProps)(Home);
