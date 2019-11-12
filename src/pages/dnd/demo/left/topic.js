/**
 * @file 题型
 */

import React from 'react';
import FormBasicItem from './item'
import GridLayout from './gridLayout'
import MetaData from './metadata'
import styles from './topic.less'

const Topic = () => (
  <div className={styles.leftTopicWarp}>
    <FormBasicItem />
    <GridLayout style={{ marginTop: 10 }} />
    <MetaData style={{ marginTop: 10 }} />
  </div>
)
export default Topic
