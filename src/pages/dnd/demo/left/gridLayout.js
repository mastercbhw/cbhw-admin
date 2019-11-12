import React from 'react'
import styles from './gridLayout.less'

const GridLayout = ({ style }) => (
  <div className={styles.girdLayoutWarp} style={style}>
    <div>布局</div>
    <div className={styles.girdLayoutContent}>
      <div className={styles.girdItem} />
      <div className={styles.girdItem} />
    </div>
  </div>
)

export default GridLayout
