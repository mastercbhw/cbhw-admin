/**
 * filename: Card
 * overview: 根据放入 Box 生成的 Card 组件
 */

import React, { useRef, useMemo } from 'react';
import { Col } from 'antd'
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames'
import CardCol from './CardCol';
import ItemTypes from './ItemTypes';
import styles from './Card.less'

const Card = ({ category, col, index, moveCard, id, cardList, changeCardList, changeInCol }) => {
  const ref = useRef(null);

  const [{ isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),

    hover(item, monitor) {
      if (!ref.current || !isOverCurrent) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // 拖拽元素下标与鼠标悬浮元素下标一致时，不进行操作
      if (dragIndex === hoverIndex) {
        return;
      }

      // 确定屏幕上矩形范围
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // 获取中点垂直坐标
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 确定鼠标位置
      const clientOffset = monitor.getClientOffset();

      // 获取距顶部距离
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      /**
       * 只在鼠标越过一半物品高度时执行移动。
       *
       * 当向下拖动时，仅当光标低于50%时才移动。
       * 当向上拖动时，仅当光标在50%以上时才移动。
       *
       * 可以防止鼠标位于元素一半高度时元素抖动的状况
       */

      // 向下拖动
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 向上拖动
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 执行 move 回调函数
      moveCard(dragIndex, hoverIndex);

      /**
       * 如果拖拽的组件为 Box，则 dragIndex 为 undefined，此时不对 item 的 index 进行修改
       * 如果拖拽的组件为 Card，则将 hoverIndex 赋值给 item 的 index 属性
       */
      if (item.index !== undefined) {
        item.index = hoverIndex;
      }
    },
  });

  const [{ opacity }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    isDragging(monitor) {
      // If your component gets unmounted while dragged
      // (like a card in Kanban board dragged between lists)
      // you can implement something like this to keep its
      // appearance dragged:
      return monitor.getItem().id === id
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
      isDragging: monitor.isDragging(),
    }),
    // item 中包含 index 属性，则在 drop 组件 hover 和 drop 是可以根据第一个参数获取到 index 值
  });


  const currentElement = useMemo(() => {
    let element = null

    if (col === 8) {
      element = (
        <>
          <Col style={{ height: '100%' }} span={8}><CardCol id={`${id}-1`} cardList={cardList} changeCardList={changeCardList} changeInCol={changeInCol} parentHoverIndex={index} index={1} /></Col>
          <Col style={{ height: '100%' }} span={8}><CardCol id={`${id}-2`} cardList={cardList} changeCardList={changeCardList} changeInCol={changeInCol} parentHoverIndex={index} index={2} /></Col>
          <Col style={{ height: '100%' }} span={8}><CardCol id={`${id}-3`} cardList={cardList} changeCardList={changeCardList} changeInCol={changeInCol} parentHoverIndex={index} index={3} /></Col>
        </>
      )
    } else if (col === 12) {
      element = (
        <>
          <Col style={{ height: '100%' }} span={12} ><CardCol id={`${id}-4`} cardList={cardList} changeCardList={changeCardList} changeInCol={changeInCol} parentHoverIndex={index} index={1} /></Col>
          <Col style={{ height: '100%' }} span={12} ><CardCol id={`${id}-5`} cardList={cardList} changeCardList={changeCardList} changeInCol={changeInCol} parentHoverIndex={index} index={2} /></Col>
        </>
      )
    } else {
      element = null
    }
    return element
  }, [col])

  // 使用 drag 和 drop 对 ref 进行包裹，则组件既可以进行拖拽也可以接收拖拽组件
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classNames({
        [styles.cardItem]: id !== -1,
        [styles.cardItemInit]: id === -1,
      })}
      style={{ opacity }}
    >
      {currentElement}
      {category}
    </div>
  )
}

export default Card;
