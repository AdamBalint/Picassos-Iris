import React, { Component } from 'react';

require('./shopitem.scss');

export class ShopItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      purchased: false,
    };
  }

  getShopItemButtonStyle(state) {
    let baseStyle = "shopItem__button grow dim ";
    return state.purchased ? baseStyle+'shopItem__purchased' : baseStyle+'shopItem__buy';
  }

  setPurchased() {
    this.setState({
      purchased: true,
    })
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
        <button onClick={(e) => { this.setPurchased() }} className={this.getShopItemButtonStyle(this.state)}>
          {this.state.purchased ? 'Purchased' : 'Buy'}
        </button>
      </div>
    );
  }
}

export default ShopItem;
