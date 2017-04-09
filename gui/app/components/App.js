import React, { Component } from 'react';
import Nav from './nav/Nav';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      isBackButtonVisible: false,
      backLink: '',
    };

    this.isBackButtonVisible = this.isBackButtonVisible.bind(this);
    this.setCurrentPageIndex = this.setCurrentPageIndex.bind(this);
    this.setBackLink = this.setBackLink.bind(this);
  }

  isBackButtonVisible(visible) {
    this.setState({
      isBackButtonVisible: visible,
    });
  }

  setBackLink(link) {
    this.setState({
      backLink: link,
    });
  }

  setCurrentPageIndex(index) {
    this.setState({
      currentPageIndex: index,
    });
  }

  getChildrenWithProps(children) {
    return children.map(this.props.children,
      (child) => React.cloneElement(child, {
        setCurrentPageIndex: this.setCurrentPageIndex,
        currentPageIndex: this.state.currentPageIndex,
        isBackButtonVisible: this.isBackButtonVisible,
        setBackLink: this.setBackLink,
      }));
  }

  render() {
    const childrenWithProps = this.getChildrenWithProps(React.Children);

    return (
      <div>
        <Nav isBackButtonVisible={this.state.isBackButtonVisible} backLink={this.state.backLink}/>
        { childrenWithProps }
      </div>
    )
  }
}
