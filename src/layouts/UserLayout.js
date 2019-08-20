import React, { Component } from 'react';
import styles from './UserLayout.less'

class UserLayout extends Component {
  render() {
    const { children } = this.props
    return (
      <div className={styles.userLayout}>
        {children}
      </div>
    );
  }
}

export default UserLayout;
