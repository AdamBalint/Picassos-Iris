import React, { Component } from 'react';
import BlendedImage from '../blendedimage/BlendedImage';
import { showModal } from '../../actions/stylize';
import { zoomIcon } from '../../util/Icons';

require('./circle-loader.scss');
require('./stylepreview.scss');

export default class StylePreview extends Component {
  constructor(props) {
    super(props);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.showControls = this.showControls.bind(this);
    this.hideControls = this.hideControls.bind(this);
    this.state = {
      showControls: false,
    };
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <div className="stylepreview__loader">
          <div className="loader"></div>
        </div>
      );
    }

    return '';
  }

  showControls() {
    this.setState({
      showControls: true,
    });
  }

  hideControls() {
    this.setState({
      showControls: false,
    });
  }

  render() {
    return (
      <div className="stylepreview" onMouseEnter={this.props.styledPreview ? this.showControls : ''} onMouseLeave={this.hideControls}>
        { this.renderSpinner() }
        <BlendedImage opacity={this.props.opacity} styledImage={this.props.styledPreview} baseImage={this.props.image}/>
        <div className={this.state.showControls ? 'controls slider-controls fade-in' : 'controls slider-controls hide'}
          onMouseEnter={this.showControls}
          onMouseLeave={this.hideControls}>
          <input type="range" onMouseUp={this.props.setOpacity} onChange={this.props.setOpacity} value={this.props.opacity}></input>
        </div>
        <div className={this.state.showControls ? 'controls zoom-controls fade-in' : 'controls zoom-controls hide'}
          onMouseEnter={this.showControls}
          onMouseLeave={this.hideControls}>
          <img className="zoom-icon grow dim" src={zoomIcon} onClick={(e) => { this.props.showModal(); }}/>
        </div>
      </div>
    );
  }
}
