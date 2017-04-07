import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { zoomIcon } from '../../util/Icons';
import { saveImage, clearState } from '../../actions/finish';
import { ImageModal } from '../imagemodal/ImageModal';
import { saveCircle } from '../../util/Icons';

require('./finish.scss');

export class Finish extends Component {
  constructor(props, context) {
    super(props, context);
    props.isBackButtonVisible(true);
    props.setCurrentPageIndex(2);
    props.setBackLink('/stylize');
    this.handleSave = this.handleSave.bind(this);
    this.handleNewImage = this.handleNewImage.bind(this);
    this.renderSaveButton = this.renderSaveButton.bind(this);
    this.renderSaveCircle = this.renderSaveCircle.bind(this);
    this.hideControls = this.hideControls.bind(this);
    this.showControls = this.showControls.bind(this);
    this.renderNewImageButton = this.renderNewImageButton.bind(this);
    this.getBackgroundImage = this.getBackgroundImage.bind(this);

    this.state = {
      hovering: false,
      isModalOpen: false,
    };
  }

  handleSave(e) {
    let { saveImage, styledResult } = this.props;
    saveImage(styledResult);
  }

  handleNewImage(e) {
    this.context.router.push('/');
    this.props.clearState();
  }

  showModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  hideModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  renderModal(state, props) {
    return (
      <ImageModal
        isModalOpen={state.isModalOpen}
        onRequestClose={() => {
          this.setState({
            isModalOpen: false,
          });
        }}
        Image={props.styledResult}
        onCloseClick={() => {
          this.hideModal();
        }}
      />
    );
  }

  renderSaveCircle() {
    if (this.props.saved) {
      return (
        <img src={saveCircle} alt="Saved" className="saved-circle"></img>
      );
    }

    return '';
  }

  renderSaveButton() {
    return (
        <button
          className="btn btn--save bg-green grow"
          onClick={(e) => { this.handleSave(e); }}>
            { this.props.saved ? 'Save again' : 'Save' }
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

  hideControls() {
    this.setState({
      hovering: false,
    })
  }

  showControls() {
    this.setState({
      hovering: true,
    });
  }

  getBackgroundImage({styledResult}) {
    if (styledResult) {
      return styledResult.getCSSImageUrl();
    } else {
      this.context.router.push('/loading-result');
      return 'none';
    }
  }

  render() {
    return (
      <div className="finish">
        <div className="finish__result-container"
          style={{
            backgroundImage: this.getBackgroundImage(this.props),
            backgroundRepeat: 'none',
          }}
          onMouseLeave={this.hideControls}
          onMouseEnter={this.showControls}
        >
          <div className={this.state.hovering ? 'zoom-result fade-in' : 'zoom-result hide'}
            onMouseEnter={this.showControls}
            onMouseLeave={this.hideControls}>
            <img className="zoom-icon grow dim" src={zoomIcon} onClick={(e) => { this.showModal(); }} />
          </div>
          {this.renderSaveCircle()}
          {this.renderModal(this.state, this.props)}
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
    saved: state.finish.saved,
  };
}

Finish.contextTypes = {
  router: PropTypes.object,
};


export default connect(mapStateToProps, { saveImage, clearState })(Finish);
