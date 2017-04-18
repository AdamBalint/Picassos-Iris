import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import { closeIcon } from '../../util/Icons';
import BlendedImage from '../blendedimage/BlendedImage';
import Image from '../../models/Image';

export class ImageModal extends Component  {
  renderImageModal(props) {
    return (
      <ReactModal
        isOpen={props.isModalOpen}
        contentLabel="styledImage"
        onRequestClose={() => {
          props.onRequestClose();
        }}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            zIndex: 5000,
          },
          content: {
            zIndex: 5000,
            height: '80%',
            width: '80%',
          },
        }}
      >
        <div className="closeIcon-container dim grow"
        style={{ zIndex: 6000 }}
        onClick={(e) => { this.props.onCloseClick(); }}>
          <img src={closeIcon} alt="Close Modal" onClick={(e) => { this.props.onCloseClick(); }}/>
        </div>
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
          <BlendedImage
          styledImage={this.props.styledImage}
          baseImage={this.props.baseImage}
          opacity={this.props.opacity}/>
        </div>
      </ReactModal>
    );
  }

  render() {
    return this.renderImageModal(this.props);
  }
}

ImageModal.defaultProps = {
  styledImage: new Image('not_valid_base64', 'png', '450', '450'),
  baseImage: new Image('not_valid_base64', '450', '450'),
  opacity: 0,
};

ImageModal.propTypes = {
  styledImage: PropTypes.instanceOf(Image).isRequired,
  baseImage: PropTypes.instanceOf(Image).isRequired,
  opacity: PropTypes.number.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default ImageModal;
