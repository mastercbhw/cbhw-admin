import { useDrop } from 'react-dnd'
import { Row, Col } from 'antd'
import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import ColItem from './ColItem'
import ItemTypes from '../itemTypes'

const style = {
  width: 400,
}
const Container = () => {
  const [cards, setCards] = useState([
    {
      id: 0,
      col: 24,
      text: 'PROFIT',
    },
    {
      id: 1,
      col: 24,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      col: 24,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      col: 24,
      text: 'Write README',
    },
    {
      id: 4,
      col: 24,
      text: 'Create some examples',
    },
    {
      id: 5,
      col: 24,
      text:
        'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
      id: 6,
      col: 24,
      text: '???',
    },
  ])

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      )
    },
    [cards],
  )
  const renderCard = (colItem, index) => (
    <ColItem
      key={colItem.id}
      index={index}
      col={colItem.col}
      id={colItem.id}
      text={colItem.text}
      moveCard={moveCard}
    />
  )


  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.BASICITEM, ItemTypes.COLITEM],
    drop: (item, monitor) => {
      // 左侧基本的input这些
      if (item.type === 'basicItem') {
        // example:  item === {type: "basicItem", id: "文本"}
        const len = cards.length
        setCards([...cards, { id: len, text: 'aaa' }])
      }
    },
    hover: (item, monitor) => {
      if (item.type === 'basicItem') {
        console.log(1)
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })


  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
      <div style={style}>{cards.map((colItem, i) => renderCard(colItem, i))}</div>
    </div>
  )
}
export default Container
