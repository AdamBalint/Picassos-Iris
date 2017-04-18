import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayPurchaseNotificaton } from '../../actions/app';
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
        if (!this.props.haveShownPurchaseNotification) {
          this.props.displayPurchaseNotificaton();
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    let purchaseBtnBaseStyle = 'shopItem__button grow dim ';
    return (
      <div className="shopItem">

        <img className="shopItem__image" style={{
          backgroundImage: this.props.preview,
        }}/>

        <div className="shopItem__price" style={{
          color: this.state.purchased ? 'white' : 'black',
        }}>{`$${this.props.price} CAD`}</div>

        <button onClick={this.onPurchaseClicked}
        className={this.state.purchased ? purchaseBtnBaseStyle + 'shopItem__purchased'
        : purchaseBtnBaseStyle + 'shopItem__buy'}>
          {this.state.purchased ? 'Purchased' : 'Buy'}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    haveShownPurchaseNotification: state.app.haveShownPurchaseNotification,
  };
}

export default connect(mapStateToProps, { displayPurchaseNotificaton })(ShopItem);
