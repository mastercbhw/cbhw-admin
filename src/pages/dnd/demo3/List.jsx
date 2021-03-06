/**
 * filename: List
 * overview: 用来存放下方 Card 列表的 List 组件
 */

import update from 'immutability-helper';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import isEqual from 'lodash/isEqual'
import ItemTypes from './ItemTypes';
import Card from './Card'
import styles from './List.less'

const List = ({ cardList, changeCardList }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
  });

  const findCard = id => {
    const card = cardList.filter(c => `${c.id}` === id)[0]
    return {
      card,
      index: cardList.indexOf(card),
    }
  }

  const moveCard = useCallback((draggedId, hoverIndex, dragIndex, col, id, monitor) => {
    // 拖拽到包含栅格的card上
    const canDrop = monitor.canDrop()
    // 从左侧拖到右侧列表
    if (dragIndex === undefined) {
      const initIndex = cardList.findIndex(_ => _.id === -1)
      if (initIndex !== hoverIndex && initIndex !== -1 && initIndex !== undefined && canDrop) {
        const newList = update(cardList, {
          $splice: [[initIndex, 1], [hoverIndex, 0, { name: '请移动到这里', id: -1, col: 24 }]],
        })
        if (!isEqual(cardList, newList)) changeCardList(newList)
      }

      return
    }

    // 仅右边拖动排序
    const { card, index } = findCard(draggedId)
    if (card) {
      const newList = update(cardList, {
        $splice: [[index, 1], [hoverIndex, 0, card]],
      });
      if (!isEqual(cardList, newList)) changeCardList(newList)
    }
  }, [cardList])

  const removeInitCard = useCallback(() => {
    const initIndex = cardList.findIndex(_ => _.id === -1)
    if (initIndex !== -1) {
      const newList = update(cardList, {
        $splice: [[initIndex, 1]],
      })
      if (!isEqual(cardList, newList)) changeCardList(newList)
    }
  }, [cardList])

  const addInitCard = useCallback(() => {
    const hasInit = cardList.some(_ => _.id === -1)
    if (!hasInit) {
      changeCardList([...cardList, { name: '请移动到这里', id: -1, col: 24 }]);
    }
  }, [cardList])


  return (
    <div className={styles.ListWarp} style={{ height: '100vh' }} ref={drop}>
      {
        cardList.length <= 0 ? (
          <div className={styles.ListIsNoData}>
            您可以通过点击拖拽【题型】或【布局】来添加
          </div>
        )
          : cardList.map((item, index) => (
            <Card
              index={index}
              id={item.id}
              key={`${item.id}${index}`}
              moveCard={moveCard}
              removeInitCard={removeInitCard}
              addInitCard={addInitCard}
              findCard={findCard}
              {...item}
            />
          ))
      }
    </div >
  )
}

export default List;
