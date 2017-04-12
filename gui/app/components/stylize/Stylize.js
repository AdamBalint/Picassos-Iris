import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ImageModal from '../imagemodal/ImageModal';
import StyleList from '../stylelist/StyleList';
import StylePreview from '../stylepreview/StylePreview';
import fetchStyles from '../../util/FetchStyles';
import { resetFinish, stylizeResult } from '../../actions/finish';

require('./stylize.scss');

const CONTINUE_ICON = '>';

const OVERLAY_STYLES = {
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  zIndex: 5000,
};

export class Stylize extends Component {

  constructor(props) {
    super(props);
    props.setCurrentPageIndex(1);
    props.isBackButtonVisible(true);
    props.setBackLink('/');
    this.state = {
      styles: [],
      fadeIn: ' fade-in-right',
      opacity: 100,
      isModalOpen: false,
    };
    this.renderContinueButton = this.renderContinueButton.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.setOpacity = this.setOpacity.bind(this);
    this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
  }

  componentDidMount(props) {
    fetchStyles((styles) => {
      let unlockedStyles = styles.filter((style) => style.unlocked);
      this.setState({ styles: unlockedStyles });
    });
  }

  handleContinueButtonClick(e, props) {
    e.preventDefault();
    this.context.router.push('/loading-result');
    props.resetFinish();
    props.stylizeResult(props.selectedStyle, props.selectedFilePath,
      props.imageFile, this.state.opacity);
  }

  renderContinueButton({selectedStyle}) {
    if (selectedStyle == -1) {
      return '';
    } else {
      return (
        <button
        className={'stylize__continue' + this.state.fadeIn}
        onClick={(e) => { this.handleContinueButtonClick(e, this.props); }}
        onMouseLeave={(e) => {
          this.setState({
            fadeIn: '',
          });
        }}>
          <span id="stylize__continue__icon">{CONTINUE_ICON}</span>
        </button>
      );
    }
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
        Image={props.styledPreview}
        onCloseClick={() => {
          this.hideModal();
        }}
      />
    );
  }

  setOpacity(e) {
    this.setState({
      opacity: e.target.value,
    });
  }

  render() {
    return (
      <div className="stylize">
        <StylePreview
        opacity={this.state.opacity}
        setOpacity={this.setOpacity}
        image={this.props.imageFile}
        selectedStyle={this.props.selectedStyle}
        loading={this.props.loading}
        showModal={this.showModal}
        styledPreview={this.props.styledPreview}/>
        { this.props.styledPreview ? this.renderModal(this.state, this.props) : ''}
        { this.renderContinueButton(this.props) }
        <StyleList data={this.state.styles}/>
      </div>
    );
  }

}

function mapStateToProps({filepicker, stylize}) {
  return {
    imageFile: filepicker.imageFile,
    selectedFilePath: filepicker.selectedFilePath,
    selectedStyle: stylize.selectedStyle,
    styledPreview: stylize.styledPreview,
    loading: stylize.loading,
  };
}

Stylize.contextTypes = {
  router: PropTypes.object,
}

export default connect(mapStateToProps, { stylizeResult, resetFinish } )(Stylize);
