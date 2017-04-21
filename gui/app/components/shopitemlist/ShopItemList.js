import React, { Component } from 'react';
import ShopItem from '../shopitem/ShopItem';

require('./shopitemlist.scss');

export class ShopItemList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderStyles(data) {
    return data.map((style, index) => {
      return (
        <li key={index}>
          <ShopItem id={style.id} preview={style.image.getCSSImageUrl()} price={style.price}/>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="shoplist">
        <ul>
          { this.renderStyles(this.props.data) }
        </ul>
      </div>
    );
  }

}

ShopItemList.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default ShopItemList;
