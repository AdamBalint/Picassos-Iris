import React, { Component } from 'react';
import { connect } from 'react-redux';

import Image from '../../model/Image';
import { cameraIcon } from '../../util/Icons';
import { pickFile } from '../../actions/filepicker';

require('./filepicker.scss');

export const FILEPICKER_STYLES = {
  NO_IMAGE: 'filepicker dim',
  IMAGE: 'filepicker--with-image dim',
  TEXT: 'filepicker__text',
  CAM: 'filepicker__camera-img',
  HIDDEN: 'filepicker__hidden-text-icon'
}

export class Filepicker extends Component {

  constructor(props) {
    super(props);
    this._filepickerClass = this._filepickerClass.bind(this);
    this._setFilePickerBackgroundFromProps = this._setFilePickerBackgroundFromProps.bind(this);
  }

  _filepickerClass() {
    let { NO_IMAGE, IMAGE } = FILEPICKER_STYLES;

    if (this.props.isFileSelected) {
      this._setFilePickerBackgroundFromProps();
      return IMAGE;
    }

    return NO_IMAGE;
  }

  _setFilePickerBackgroundFromProps() {
    let { imageFile } = this.props;
    this.refs.filepicker.style.backgroundImage = imageFile.getCSSImageUrl();
  }

  render() {
    let { TEXT, CAM, HIDDEN } = FILEPICKER_STYLES;

    return (
      <div
        ref="filepicker"
        className={this._filepickerClass()}
        onClick={this.props.pickFile}>
          <div
            className={!this.props.isFileSelected ? TEXT : HIDDEN}>
              Click here to select a photo to style!
          </div>
          <img
            className={!this.props.isFileSelected ? CAM : HIDDEN}
            src={cameraIcon}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFileSelected: state.filepicker.isFileSelected,
    imageFile: state.filepicker.imageFile
  }
}

export default connect(mapStateToProps, {pickFile})(Filepicker);
