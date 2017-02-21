import React, { Component } from 'react';
import Filepicker from '../filepicker/filepicker.js';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./home.scss');

export class Home extends Component {

  constructor(props) {
    super(props);
    this._renderContinueButton = this._renderContinueButton.bind(this);
  }

  _renderContinueButton() {
    if (this.props.isFileSelected) {
      return (
          <button className="btn btn--continue bg-animate hover-bg-black hover-white grow">
            <Link to='/stylize'>Continue</Link>
          </button>
      );
    }
  }

  render() {
    return (
      <div className="container">
          <Filepicker/>
          {this._renderContinueButton()}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    isFileSelected: state.filepicker.isFileSelected,
  }
}


export default connect(mapStateToProps)(Home);
