import React, { Component } from 'react';
import { cameraIcon } from '../../util/Icons';
import { ajax } from '../../util/Ajax';

require('./home.scss');

/**
 * This component represents the first screen
 */

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {  selectedFilePath: '', filePickerStyle: {} };
    this.renderContinueButton = this.renderContinueButton.bind(this);
    this.handleFilePicker = this.handleFilePicker.bind(this);
  }

  renderContinueButton() {
    // If the user has selected a file, show the Continue button
    if (this.state.selectedFilePath) {
      return (
        <button className="btn btn--continue bg-animate hover-bg-black hover-white grow">
          Continue
        </button>
      )
    }
  }

  handleFilePicker() {
    ajax('/open/file', "GET", (event) => {
      let response = JSON.parse(event.currentTarget.responseText);

      if (response.status != 'cancel') {
        let dataString = `data:${response.ext};base64,${response.img_base64}`;

        this.filePickerText.style.display = 'none';
        this.camera.style.display = 'none';

        this.setState({
          filePickerStyle: {
            backgroundImage: `url(${dataString})`,
            backgroundSize: 'cover',
            width: '622px',
            height: '288px',
            backgroundRepeat: 'no-repeat',
          },
          selectedFilePath: response.file_path
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
          <div
            ref = { (filepicker) => { this.filepicker = filepicker }}
            className="filepicker dim"
            onClick={this.handleFilePicker}
            style = { this.state.filePickerStyle }
            >
            <div ref = { (filePickerText) => { this.filePickerText = filePickerText }}
              className="filepicker__text">
              Click here to select a photo to style!
            </div>
            <img ref = { (camera) => { this.camera = camera }}
              className ="filepicker__camera-img" src={cameraIcon}/>
          </div>

          { this.renderContinueButton() }
      </div>
    )
  }

}
