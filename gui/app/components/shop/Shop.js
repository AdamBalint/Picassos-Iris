import React from 'react';
import { connect } from 'react-redux';
import ShopItemList from '../shopitemlist/ShopItemList';
import Image from '../../models/Image';
import axios from 'axios';
import fetchStyles from '../../util/FetchStyles';

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

    this.state = {
      styles: [],
    };

    props.isBackButtonVisible(true);
    props.setBackLink(backLink);
  }

  componentDidMount(props) {
    fetchStyles((styles) => {
      let unlockedStyles = styles.filter((style) => style.unlocked == false);
      this.setState({ styles: unlockedStyles });
    });
  }

  render() {
    return (
      <div className="shop">
        <ShopItemList data={this.state.styles} />
      </div>
    );
  }
}

export default Shop;
