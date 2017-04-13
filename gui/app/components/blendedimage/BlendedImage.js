import React, { Component, PropTypes } from 'react';
import Image from '../../models/Image';

require('./blendedimage.scss');

class BlendedImage extends Component {

  constructor(props) {
    super(props);
  }

  getImage(image) {
    return {
      backgroundImage: image.getCSSImageUrl(),
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
  }

  getStyledImageWithOpacity({styledImage, opacity}) {
    // Divide the slider value by 100 to get the CSS opacity value
    let style = this.getImage(styledImage);
    style.opacity = opacity / 100;
    return style;
  }

  renderBaseImage() {
    let { baseImage } = this.props;
    return (
      <div className="image--no-style" style={this.getImage(baseImage)}></div>
    );
  }

  renderStyledImageWithOpacity() {
    return (
      <div className="image--style"
        style={this.getStyledImageWithOpacity(this.props)}>
      </div>
    );
  }

  render() {
    return (
      <div className="blendedimage">
        { this.renderBaseImage() }
        { this.props.styledImage ? this.renderStyledImageWithOpacity() : '' }
      </div>
    );
  }

}

BlendedImage.PropTypes = {
  opacity: PropTypes.number.isRequired,
  styledImage: PropTypes.instanceOf(Image).isRequired,
  baseImage: PropTypes.instanceOf(Image).isRequired,
};

export default BlendedImage;
