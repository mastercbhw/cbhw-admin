/**
 * filename: List
 * overview: 用来存放下方 Card 列表的 List 组件
 */

import update from 'immutability-helper';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Card from './Card';
import styles from './List.less'

const List = ({ cardList, changeCardList }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.Card,
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    /**
     * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
     * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
     */
    if (dragIndex === undefined && hoverIndex) {
      const lessIndex = cardList.findIndex(item => item.id === -1);
      changeCardList(update(cardList, {
        $splice: [[lessIndex, 1], [hoverIndex, 0, { bg: 'aqua', category: '放这里', id: -1, col: 24 }]],
      }));
    }


    // card数组的数据移动
    if (dragIndex !== undefined && hoverIndex !== undefined) {
      const dragCard = cardList[dragIndex];
      changeCardList(update(cardList, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      }));
    }
  }, [cardList])

  return (
    <div className={styles.ListWarp} ref={drop}>
      {
        cardList.length <= 0 ? <div style={{ lineHeight: '60px' }}>请放入水果</div>
          : cardList.map((item, index) => <Card index={index} key={`${item.id}${index}`} moveCard={moveCard} {...item} />)
      }
    </div>
  )
}

export default List;
