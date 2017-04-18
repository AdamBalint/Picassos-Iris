import React, { Component } from 'react';
import Filepicker from '../filepicker/Filepicker';
import { resetStylize } from '../../actions/stylize';
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
          <Link to="/stylize">
            <button className="btn btn--continue bg-animate hover-bg-black hover-white grow" onClick={(e) => {
              if (this.props.styledPreview) {
                this.props.resetStylize();
              }
            }}>
              Continue
            </button>
          </Link>
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

function mapStateToProps({filepicker, stylize}) {
  return {
    isFileSelected: filepicker.isFileSelected,
    styledPreview: stylize.styledPreview,
  };
}

export default connect(mapStateToProps, { resetStylize })(Home);
