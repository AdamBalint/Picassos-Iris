import React, { Component } from 'react';
import axios from 'axios';

require('./shopitem.scss');

export class ShopItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      purchased: false,
    };

    this.onPurchaseClicked = this.onPurchaseClicked.bind(this);
  }

  getShopItemButtonStyle(state) {
    let baseStyle = 'shopItem__button grow dim ';
    return state.purchased ? baseStyle + 'shopItem__purchased' : baseStyle + 'shopItem__buy';
  }

  setPurchased() {
    this.setState({
      purchased: true,
    });
  }

  onPurchaseClicked() {
    this.setPurchased();
    axios.post('/shop/purchase', {
      id: this.props.id,
    })
    .then(({data}) => {
      if (data.status == 'ok') {
        this.props.displayNotificationWithMessage('Try styling another image to use this style!');
        setTimeout(() => {
          this.props.dismissNotification();
        }, 4000);
      }
    })
    .catch((err) => {
      this.props.displayNotificationWithMessage('Uh-oh, something bad happened when purchasing this style!');
    });
  }

  render() {
    return (
      <div className="shopItem">
        <img className="shopItem__image" style={{
          backgroundImage: this.props.preview,
        }}/>
        <div className="shopItem__price" style={{
          color: this.state.purchased ? 'white' : 'black',
        }}>{`$${this.props.price} CAD`}</div>
        <button onClick={this.onPurchaseClicked} className={this.getShopItemButtonStyle(this.state)}>
          {this.state.purchased ? 'Purchased' : 'Buy'}
        </button>
      </div>
    );
  }
}

export default ShopItem;
