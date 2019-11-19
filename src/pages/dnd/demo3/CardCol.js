import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import styles from './CardCol.less'

function getStyle(borderColor) {
  return {
    borderColor,
  }
}

/**
 *
 * @param {number} parentHoverIndex 父元素划过的索引
 * @param {number} index 当前的索引
 */

const CardCol = ({ parentHoverIndex, index, moveCard, col }) => {
  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item, monitor) {
      console.log('TCL: drop -> item', item)
      if (!item.col || (item.hasOwnProperty('col') && item.col !== 24)) {
        return
      }

      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }

      setHasDropped(true)
      setHasDroppedOnChild(didDrop)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const text = '栅格col'
  let borderColor = '#fff'
  if (isOver) {
    borderColor = '#ff4d4f'
  }

  return (
    <div ref={drop} className={styles.cardCol} style={getStyle(borderColor)}>
      {text}
    </div>
  )
}
export default CardCol
