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
    props.isBackButtonVisible(false);
    props.setCurrentPageIndex(0);
  }

  renderContinueButton() {
    if (this.props.isFileSelected) {
      return (
          <button className="btn btn--continue bg-animate hover-bg-black hover-white grow" onClick={(e) => {
            if (this.props.styledPreview) {
              this.props.resetStylize();
            }
          }}>
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

function mapStateToProps({filepicker, stylize}) {
  return {
    isFileSelected: filepicker.isFileSelected,
    styledPreview: stylize.styledPreview,
  };
}

export default connect(mapStateToProps, { resetStylize })(Home);
