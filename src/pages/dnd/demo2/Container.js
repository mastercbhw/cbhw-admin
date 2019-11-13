/**
 * filename: Container
 * overview: 整个拖拽演示界面
 */

import React, { useState, useCallback } from 'react';
import nanoid from 'nanoid'
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

const cardListData = []
console.log('TCL: cardListData', cardListData)


const Container = () => {
  const [cardList, setCardList] = useState(cardListData);

  const changeCardList = list => {
    console.log('TCL: Container -> list', list)
    setCardList([...list]);
  }


  const listRender = useCallback(() => <List cardList={cardList} changeCardList={changeCardList} />, [cardList])

  return (
    <div className={styles.dragWarp}>
      <div className={styles.leftContent}>
        {
          boxs.map((item, index) => <Box key={`${item.id}${index}`} {...item} cardList={cardList} changeCardList={changeCardList} />)
        }
      </div>
      <div className={styles.centerContent}>
        {listRender()}
      </div>
    </div>
  )
}

export default Container;
