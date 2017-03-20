import React, { Component } from 'react';

require('./circle-loader.scss');
require('./stylepreview.scss');

export default class StylePreview extends Component {
  constructor(props) {
    super(props);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderStylePreview = this.renderStylePreview.bind(this);
    this.showSlider = this.showSlider.bind(this);
    this.hideSlider = this.hideSlider.bind(this);
    this.getStyledImage = this.getStyledImage.bind(this);
    this.setOpacity = this.setOpacity.bind(this);

    this.state = {
      hovering: false,
      opacity: 100,
    };
  }

  getImage(image) {
    return {
      backgroundImage: image.getCSSImageUrl(),
    };
  }

  getStyledImage(styledImage) {
    let style = this.getImage(styledImage);
    // Divide the slider value by 100 to get the CSS opacity value
    style.opacity = this.state.opacity / 100;
    return style;
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

  showSlider() {
    this.setState({
      hovering: true,
    });
  }

  hideSlider() {
    this.setState({
      hovering: false,
    });
  }
  
  renderStylePreview() {
    if (this.props.styledPreview) {
      return (
        <div className="image--style"
        style={this.getStyledImage(this.props.styledPreview)}
        onMouseEnter={this.showSlider}
        onMouseLeave={this.hideSlider}>
        </div>
      );
    }

    return '';
  }

  setOpacity(e) {
    this.setState({
      opacity: e.target.value,
    });
  }

  render() {
    return (
      <div className="stylepreview">
        { this.renderSpinner() }
        <div className="image--no-style" style={this.getImage(this.props.image)}></div>
        <div className={this.state.hovering ? 'slider fade-in' : 'slider hide'}
          onMouseEnter={this.showSlider}
          onMouseLeave={this.hideSlider}>
          <input type="range" onChange={this.setOpacity} value={this.state.opacity}></input>
        </div>
        { this.renderStylePreview() }
      </div>
    );
  }
}
