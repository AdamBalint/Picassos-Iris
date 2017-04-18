import React from 'react';
import ShopItemList from '../shopitemlist/ShopItemList';
import fetchStyles from '../../util/FetchStyles';

require('./shop.scss');

export class Shop extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      styles: [],
    };

  }

  componentWillMount() {
    fetchStyles((styles) => {
      let unlockedStyles = styles.filter((style) => style.unlocked == false);
      this.setState({ styles: unlockedStyles, shownNotification: false });
    });
  }

  changeNotificationStatus(status) {
    this.setState({
      shownNotification: status,
    });
  }

  render() {
    return (
      <div className="shop">
        <ShopItemList
        haventShownPurchaseNotification={this.props.haventShownPurchaseNotification}
        dismissPurchaseNotification={this.props.dismissPurchaseNotification}
        displayPurchaseNotification={this.props.displayPurchaseNotification}
        data={this.state.styles} />
      </div>
    );
  }
}

export default Shop;
