import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import StyleItem from '../styleitem/StyleItem';

require('./stylelist.scss');

export default class StyleList extends Component {

  constructor(props) {
    super(props);
  }

  renderStyles({data}) {
    return data.map((style, index) => {
      return (
        <li data-tip data-for={`${style.id}-style`} key={index}>
          <StyleItem id={style.id} style={style}/>
          <ReactTooltip id={`${style.id}-style`} place="top" type="dark" effect="float">
            {style.name}
          </ReactTooltip>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="stylelist">
        <ul>
            {this.props.data ? this.renderStyles(this.props) : ''}
        </ul>
      </div>
    );
  }

}
