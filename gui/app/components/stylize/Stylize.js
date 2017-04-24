import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImageModal from '../imagemodal/ImageModal';
import StyleList from '../stylelist/StyleList';
import StylePreview from '../stylepreview/StylePreview';
import fetchStyles from '../../util/FetchStyles';
import { displaySliderNotification, dismissSliderNotification } from '../../actions/app';
import { stylizeResult, resetLoading } from '../../actions/finish';

require('./stylize.scss');

const CONTINUE_ICON = '>';

export class Stylize extends Component {

  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      fadeIn: ' fade-in-right',
      opacity: 100,
      isModalOpen: false,
      shownNotification: props.showSliderNotification,
    };

    this.renderContinueButton = this.renderContinueButton.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.setOpacity = this.setOpacity.bind(this);
    this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.resetLoading();
  }

  componentDidMount() {
    fetchStyles((styles) => {
      let unlockedStyles = styles.filter((style) => style.unlocked);
      this.setState({ styles: unlockedStyles });
    });
  }

  handleContinueButtonClick(e, props) {
    e.preventDefault();
    this.context.router.push('/loading-result');
    props.stylizeResult(props.selectedStyle, props.selectedFilePath,
    props.imageFile, this.state.opacity);
  }

  renderContinueButton() {
    let { selectedStyle } = this.props;
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

  renderModal() {
    let { isModalOpen, opacity } = this.state;
    let { styledPreview, imageFile } = this.props;
    return (
      <ImageModal
        isModalOpen={isModalOpen}
        onRequestClose={() => {
          this.setState({
            isModalOpen: false,
          });
        }}
        styledImage={styledPreview}
        baseImage={imageFile}
        opacity={opacity}
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

        { this.props.styledPreview ? this.renderModal() : ''}

        { this.renderContinueButton() }

        <StyleList data={this.state.styles}/>
      </div>
    );
  }

}

function mapStateToProps({filepicker, stylize, app }) {
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
};

export default connect(mapStateToProps, { stylizeResult,
  resetLoading, dismissSliderNotification, displaySliderNotification } )(Stylize);
