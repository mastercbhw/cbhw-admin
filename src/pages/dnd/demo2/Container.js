/**
 * filename: Container
 * overview: 整个拖拽演示界面
 */

import React, { useState } from 'react';
import Box from './Box';
import List from './List';
import styles from './index.less'

const boxs = [
  { id: 1, category: '标题', bg: 'red', col: 24 },
  { id: 2, category: '文本框', bg: 'yellow', col: 24 },
  { id: 3, category: 'radio单选', bg: 'orange', col: 24 },
  { id: 4, category: 'checkbox多选', bg: 'purple', col: 24 },
  { id: 5, category: 'select下拉框', bg: 'green', col: 24 },
  { id: 7, category: '两格', bg: 'red', col: 12 },
  { id: 8, category: '三格', bg: 'yellow', col: 8 },
]


const Container = () => {
  const [cardList, setCardList] = useState([]);

  const changeCardList = list => {
    setCardList([...list]);
  }


  const changeLayoutList = list => {
    setCardList([...list]);
  }

  return (
    <div className={styles.dragWarp}>
      <div className={styles.leftContent}>
        {
          boxs.map((item, index) => <Box key={`${item.id}${index}`} {...item} cardList={cardList} changeCardList={changeCardList} />)
        }
      </div>
      <div className={styles.centerContent}>
        <List cardList={cardList} changeCardList={changeCardList} />
      </div>
    </div>
  )
}

export default Container;
