import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'

function getStyle(borderColor) {
  return {
    border: '1px dashed',
    boxSizing: 'border-box',
    background: '#ccc',
    // minHeight: '40px',
    height: '100%',
    margin: 10,
    color: 'white',
    borderColor,
    textAlign: 'center',
    borderRadius: 5,
  }
}

/**
 *
 * @param {number} parentHoverIndex 父元素划过的索引
 * @param {number} index 当前的索引
 */

const CardCol = ({ id, parentHoverIndex, index, inCol, changeInCol }) => {
  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.CARD],
    drop(item, monitor) {
      if (!item.col || (item.hasOwnProperty('col') && item.col !== 24)) {
        return
      }
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      // console.log('TCL: CardCol drop -> item', item)
      // console.log('TCL: CardCol -> parentHoverIndex', parentHoverIndex)
      // console.log('TCL: CardCol -> index', index)

      setHasDropped(true)
      setHasDroppedOnChild(didDrop)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const text = '栅格col'
  let flag = false
  let borderColor = '#fff'
  if (isOverCurrent) {
    flag = true
    borderColor = '#ff4d4f'
  }
  changeInCol(flag)

  return (
    <div ref={drop} style={getStyle(borderColor)}>
      {text}
      <br />
      {hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}
    </div>
  )
}
export default CardCol
