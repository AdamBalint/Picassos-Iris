import React, { Component } from 'react';
import ShopItem from '../shopitem/ShopItem';

require('./shopitemlist.scss');

export class ShopItemList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderStyles({ data }) {
    return data.map((style, index) => {
      return (
        <li>
          <ShopItem id={index} preview={style.image.getCSSImageUrl()} price={style.price}/>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="shoplist">
        <ul>
          {this.props.data ? this.renderStyles(this.props) : ''}
        </ul>
      </div>
    );
  }

}

ShopItemList.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default ShopItemList;
