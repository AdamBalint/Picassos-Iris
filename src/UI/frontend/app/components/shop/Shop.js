import React from 'react';
import MockItems from '../shopitemlist/Mockitems';
import ShopItemList from '../shopitemlist/ShopItemList';

require('./shop.scss');

export class Shop extends React.Component {
  constructor(props, context) {
    super(props, context);

    let backLink = '';

    switch (props.currentPageIndex) {
      case 0: {
        backLink = '/';
        break;
      }
      case 1: {
        backLink = '/stylize';
        break;
      }
      case 2: {
        backLink = '/finish';
        break;
      }
    }

    props.isBackButtonVisible(true);
    props.setBackLink(backLink);
  }

  render() {
    return (
      <div className="shop">
        <ShopItemList data={MockItems}/>
      </div>
    );
  }
}

export default Shop;
