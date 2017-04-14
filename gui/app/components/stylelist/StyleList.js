import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyleItem from '../styleitem/StyleItem';

require('./stylelist.scss');

export default class StyleList extends Component {

  constructor(props) {
    super(props);
  }

  renderStyles({data}) {
    return data.map((style, index) => {
      return (
          <li>
              <StyleItem id={style.id} style={style}/>
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
