import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveImage } from '../../actions/finish';

require('./finish.scss');

export class Finish extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewImage = this.handleNewImage.bind(this);
    this.renderSaveButton = this.renderSaveButton.bind(this);
    this.renderNewImageButton = this.renderNewImageButton.bind(this);
  }

  handleSave(e) {
    let { saveImage, styledResult } = this.props;
    saveImage(styledResult);
  }

  handleNewImage(e) {
    // TODO: Handle new image here,
    // You'll have to clear the entire cache
  }

  renderSaveButton() {
    return (
        <button
          className="btn btn--save bg-green grow"
          onClick={(e) => { this.handleSave(e); }}>
            Save
        </button>
      );
  }

  renderNewImageButton() {
    return (
        <button
          className="btn btn--another-image bg-animate hover-bg-black hover-white grow"
          onClick={this.handleNewImage}>
          Another Image
        </button>
      );
  }

  render() {
    return (
      <div className="finish">
        <div className="finish__result-container" style={{
          backgroundImage: this.props.styledResult.getCSSImageUrl(),
          backgroundRepeat: 'none',
        }}>
        </div>
        <div className="finish__buttons-container">
          {this.renderNewImageButton()}
          {this.renderSaveButton()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styledResult: state.finish.styledResult,
  };
}

export default connect(mapStateToProps, { saveImage })(Finish);
