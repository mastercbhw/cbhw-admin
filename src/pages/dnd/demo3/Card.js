/**
 * filename: Card
 * overview: 根据放入 Box 生成的 Card 组件
 */

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames'
import ItemTypes from './ItemTypes';
import styles from './Card.less'

const Card = ({ id, name, col, index, moveCard }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),

    hover(item) {
      if (!ref.current) {
        return;
      }
      const { id: draggedId, index: dragIndex } = item
      const hoverIndex = index

      if (id !== draggedId) {
        moveCard(draggedId, hoverIndex, dragIndex)
      }
    },
  });

  const [{ opacity }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    isDragging(monitor) {
      return monitor.getItem().id === id
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
    // item 中包含 index 属性，则在 drop 组件 hover 和 drop 是可以根据第一个参数获取到 index 值
  });

  // 使用 drag 和 drop 对 ref 进行包裹，则组件既可以进行拖拽也可以接收拖拽组件
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classNames({
        [styles.cardItem]: true,
        [styles.cardItem]: id !== -1,
        [styles.cardItemInit]: id === -1,
        [styles.cardItemColWarp]: id !== -1 && col !== 24,
      })}
      style={{ opacity }}
    >
      {name}
    </div>
  )
}

export default Card;
