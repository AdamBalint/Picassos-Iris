import React from 'react';
import ShopItemList from '../shopitemlist/ShopItemList';
import fetchStyles from '../../util/FetchStyles';

require('./shop.scss');

export class Shop extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      styles: [],
      loaded: false,
    };

    this.renderShop = this.renderShop.bind(this);
  }

  componentWillMount() {
    fetchStyles((styles) => {
      let unlockedStyles = styles.filter((style) => style.unlocked == false);
      this.setState({ styles: unlockedStyles, loaded: true});
    });
  }

  renderShop() {
    if (this.state.styles.length > 0) {
      return <ShopItemList data={this.state.styles} />;
    } else {
      if (this.state.loaded) {
        return (
          <div className="shop__styles-message">
            <h1>We don't have any more styles for you! Thanks you for using Iris.</h1>
          </div>
        );
      } else {
        return '';
      }
    }
  }

  render() {
    return (
      <div className="shop">
        { this.renderShop() }
      </div>
    );
  }
}

export default Shop;
