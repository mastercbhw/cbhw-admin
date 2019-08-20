import React, { Component } from 'react';

class BasicLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <div>
        基础首页
        {children}
      </div>
    );
  }
}

export default BasicLayout;
