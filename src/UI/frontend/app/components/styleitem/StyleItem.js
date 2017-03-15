import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectStyle, stylize } from '../../actions/stylize';

require('./styleitem.scss');

export class StyleItem extends Component {

  constructor(props) {
    super(props);
  }

  getClassName(props) {
    return props.selectedStyle == props.id ? 'styleitem--clicked' : 'styleitem';
  }

  getStyle(props) {
    return {
      backgroundImage: props.style.image.getCSSImageUrl(),
    };
  }

  selectStyle(props) {
    if (props.selectedStyle != props.id) {
      props.selectStyle(props.id);
      props.stylize(props.imagePath, 415, 377);
    }
  }

  render() {
    return (
      <div className={this.getClassName(this.props)}
      style={this.getStyle(this.props)}
      onClick={(e) => {this.selectStyle(this.props)}}>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    imagePath: state.filepicker.selectedFilePath,
    selectedStyle: state.stylize.selectedStyle,
  };
}

export default connect(mapStateToProps, { selectStyle, stylize })(StyleItem);
