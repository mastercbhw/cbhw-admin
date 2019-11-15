/**
 * filename: Card
 * overview: 根据放入 Box 生成的 Card 组件
 */

import React, { useRef, useMemo } from 'react';
import { Col, Row } from 'antd'
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames'
import CardCol from './CardCol';
import ItemTypes from './ItemTypes';
import styles from './Card.less'

const Card = ({ category, col, index, moveCard, id, changeInCol }) => {
  const ref = useRef(null);

  const [{ isOverCurrent, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),

    hover(item, monitor) {
      // monitor.isOver()  嵌套的也无所谓，只要在其上方就为true
      // monitor.isOver({ shallow: true }) 嵌套的话会被遮挡，必须直接接触才能为true
      if (!ref.current || !monitor.isOver() || !monitor.isOver({ shallow: true })) {
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

      moveCard(dragIndex, hoverIndex);

      // if (col !== 24) {
      //   changeInCol(true)
      // } else {
      //   changeInCol(false)
      // }
      // 执行 move 回调函数

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
      item: monitor.getItem(),
    }),
    // item 中包含 index 属性，则在 drop 组件 hover 和 drop 是可以根据第一个参数获取到 index 值
  });


  const currentElement = useMemo(() => {
    let element = null

    if (col === 8) {
      element = (
        <Row gutter={10}>
          <Col span={8}><CardCol changeInCol={changeInCol} parentHoverIndex={index} index={1} /></Col>
          <Col span={8}><CardCol changeInCol={changeInCol} parentHoverIndex={index} index={2} /></Col>
          <Col span={8}><CardCol changeInCol={changeInCol} parentHoverIndex={index} index={3} /></Col>
        </Row>
      )
    } else if (col === 12) {
      element = (
        <Row gutter={10}>
          <Col span={12} ><CardCol changeInCol={changeInCol} parentHoverIndex={index} index={1} /></Col>
          <Col span={12} ><CardCol changeInCol={changeInCol} parentHoverIndex={index} index={2} /></Col>
        </Row>
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
        [styles.cardItem]: id !== -1 && col === 24,
        [styles.cardItemInit]: id === -1 && col === 24,
        [styles.cardItemColWarp]: id !== -1 && col !== 24,
      })}
      style={{ opacity }}
    >
      {col === 24 ? category : currentElement}
      {/* {col === 24 ? category : null} */}
    </div>
  )
}

export default Card;
