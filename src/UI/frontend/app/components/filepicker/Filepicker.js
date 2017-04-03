import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cameraIcon } from '../../util/Icons';
import { pickFile } from '../../actions/filepicker';

require('./filepicker.scss');

export const FILEPICKER_STYLES = {
  NO_IMAGE: 'filepicker dim',
  IMAGE: 'filepicker--with-image dim',
  TEXT: 'filepicker__text',
  CAM: 'filepicker__camera-img',
  HIDDEN: 'filepicker__hidden-text-icon',
};

export class Filepicker extends Component {

  constructor(props) {
    super(props);
  }

  getFilePickerClassName(props) {
    const { NO_IMAGE, IMAGE } = FILEPICKER_STYLES;
    return props.isFileSelected ? IMAGE : NO_IMAGE;
  }

  getFilePickerStyle(props) {
    if (props.isFileSelected) {
      return {
        backgroundImage: props.imageFile.getCSSImageUrl(),
      };
    }

    return {};
  }

  render() {
    let { TEXT, CAM, HIDDEN } = FILEPICKER_STYLES;

    return (
      <div
        ref="filepicker"
        className={ this.getFilePickerClassName(this.props) }
        style={ this.getFilePickerStyle(this.props) }
        onClick={ this.props.pickFile }>
          <div className={ this.props.isFileSelected ? HIDDEN : TEXT }>
              Click here to select a photo to style!
          </div>
          <img
            className={ this.props.isFileSelected ? HIDDEN : CAM }
            src={ cameraIcon }/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFileSelected: state.filepicker.isFileSelected,
    imageFile: state.filepicker.imageFile,
  };
}

export default connect(mapStateToProps, { pickFile })(Filepicker);
