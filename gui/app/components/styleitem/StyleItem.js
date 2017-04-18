import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displaySliderNotification } from '../../actions/app';
import { selectStyle, stylize } from '../../actions/stylize';

require('./styleitem.scss');

export class StyleItem extends Component {

  constructor(props) {
    super(props);
    this.selectStyle = this.selectStyle.bind(this);
    this.scrollToPosition = this.scrollToPosition.bind(this);
    this.displayNotification = this.displayNotification.bind(this);
  }

  getClassName(props) {
    return props.selectedStyle == props.id ? 'styleitem--clicked' : 'styleitem';
  }

  getStyle(props) {
    return {
      backgroundImage: props.style.image.getCSSImageUrl(),
    };
  }

  scrollToPosition() {
    this.refs[`${this.props.id}-style`].scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  displayNotification() {
    if (!this.props.haveShownSliderNotification) {
      this.props.displaySliderNotification();
    }
  }

  selectStyle(e) {
    if (this.props.selectedStyle != this.props.id) {
      this.props.selectStyle(this.props.id, this.props.style.quotes);
      this.props.stylize(this.props.id, this.props.imagePath, 415, 377);
      this.scrollToPosition();
      this.displayNotification();
    }
  }

  render() {
    return (
      <div>
        <div ref={`${this.props.id}-style`} className={this.getClassName(this.props)}
        style={this.getStyle(this.props)}
        onClick={(e) => { this.selectStyle(e); }}>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    imagePath: state.filepicker.selectedFilePath,
    selectedStyle: state.stylize.selectedStyle,
    haveShownSliderNotification: state.app.haveShownSliderNotification,
    showSliderNotification: state.app.showSliderNotification,
  };
}

export default connect(mapStateToProps, {
  selectStyle, stylize, displaySliderNotification })(StyleItem);
