import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import { closeIcon } from '../../util/Icons';

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
            backgroundImage: props.Image ? props.Image.getCSSImageUrl() : '',
            backgroundSize: 'cover',
            zIndex: 5000,
          },
        }}
      >
        <div className="closeIcon-container dim grow" onClick={(e) => { this.props.onCloseClick(); }}>
          <img src={closeIcon} alt="Close Modal" />
        </div>
      </ReactModal>
    );
  }

  render() {
    return this.renderImageModal(this.props);
  }
}

ImageModal.propTypes = {
  Image: PropTypes.any.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
}

export default ImageModal;
