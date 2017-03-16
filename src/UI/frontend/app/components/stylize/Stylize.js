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
    };
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
      // TODO: Implement
      return (
        <div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="stylize">
        <StylePreview 
        image={this.props.imageFile} 
        styledPreview={this.props.styledPreview}/>

        <StyleList data={this.state.styles}/>
        { this.renderContinueButton(this.props) }
      </div>
    );
  }

}

function mapStateToProps({filepicker, stylize}) {
  return {
    imageFile: filepicker.imageFile,
    selectedStyle: stylize.selectedStyle,
    styledPreview: stylize.styledPreview,
  };
}

export default connect(mapStateToProps)(Stylize);
