import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyleList from '../stylelist/StyleList';
import StylePreview from '../stylepreview/StylePreview';
import fetchStyles from '../../util/FetchStyles';

require('./stylize.scss');

export class Stylize extends Component {

  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      fadeIn: ' fade-in-right',
    };
    this.renderContinueButton = this.renderContinueButton.bind(this);
  }

  componentDidMount(props) {
    fetchStyles((styles) => {
      this.setState({ styles });
    });
  }

  renderContinueButton({selectedStyle}) {
    if (selectedStyle == -1) {
      return '';
    } else {
      return (
        <button 
        className={'stylize__continue' + this.state.fadeIn} 
        onMouseLeave={(e) => { 
          this.setState({
            fadeIn: '',
          });
        }}>
          <span id="stylize__continue__icon">></span>
        </button>
      );
    }
  }

  render() {
    return (
      <div className="stylize">
        <StylePreview 
        image={this.props.imageFile}
        selectedStyle={this.props.selectedStyle} 
        loading={this.props.loading}
        styledPreview={this.props.styledPreview}/>
        { this.renderContinueButton(this.props) }
        <StyleList data={this.state.styles}/>
      </div>
    );
  }

}

function mapStateToProps({filepicker, stylize}) {
  return {
    imageFile: filepicker.imageFile,
    selectedStyle: stylize.selectedStyle,
    styledPreview: stylize.styledPreview,
    loading: stylize.loading,
  };
}

export default connect(mapStateToProps)(Stylize);
