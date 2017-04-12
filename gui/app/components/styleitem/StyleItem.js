import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectStyle, stylize } from '../../actions/stylize';

require('./styleitem.scss');

export class StyleItem extends Component {

  constructor(props) {
    super(props);
    this.selectStyle = this.selectStyle.bind(this);
  }

  getClassName(props) {
    return props.selectedStyle == props.id ? 'styleitem--clicked' : 'styleitem';
  }

  getStyle(props) {
    return {
      backgroundImage: props.style.image.getCSSImageUrl(),
    };
  }

  selectStyle(e) {
    if (this.props.selectedStyle != this.props.id) {
      this.props.selectStyle(this.props.id, this.props.style.quotes);
      this.props.stylize(this.props.id, this.props.imagePath, 415, 377);
      // Scroll to this styles position in the list
      this.refs[`${this.props.id}-style`].scrollIntoView({block: 'end', behavior:'smooth'});
    }
  }

  render() {
    return (
      <div ref={`${this.props.id}-style`} className={this.getClassName(this.props)}
      style={this.getStyle(this.props)}
      onClick={this.selectStyle}>
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
