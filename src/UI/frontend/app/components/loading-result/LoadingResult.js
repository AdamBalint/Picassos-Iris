import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

require('./loadingresult.scss');

export class LoadingResult extends Component {
  constructor(props, context) {
    super(props, context);
    props.isBackButtonVisible(false);
    props.setCurrentPageIndex(2);
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomQuote(quotes) {
    return quotes[this.getRandomIndex(0, quotes.length - 1)];
  }

  renderSpinner({quotes, loading}) {
    console.log(quotes);
    if (loading) {
      return (
        <div className="loadingResult__container">
          <div className="loader" style={{
            borderLeft: '1.1em solid #000',
          }}></div>
          <div className="loadingResult__container__loadingText">
            Iris is preparing your image..
            <div>
              {this.getRandomQuote(quotes)}
            </div>
          </div>
        </div>
      );
    } else {
      browserHistory.push('/finish');
      return '';
    }
  }

  render() {
    return (
      <div className="loadingResult">
        {this.renderSpinner(this.props)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quotes: state.stylize.quotes,
    loading: state.finish.loading,
  };
}

export default connect(mapStateToProps)(LoadingResult);
