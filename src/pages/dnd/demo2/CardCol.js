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

const CardCol = ({ parentHoverIndex, index, changeInCol, moveCard }) => {
  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop(item, monitor) {
      console.log('TCL: canDrop -> monitor.getItem()', monitor.getItem())
      const col = monitor.getItem() ? monitor.getItem().col : 24
      return col === 24
    },
    drop(item, monitor) {
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
    // hover(item, monitor) {
    //   changeInCol(monitor.isOver({ shallow: true }))
    // },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const text = '栅格col'
  const flag = false
  let borderColor = '#fff'
  console.log('TCL: isOver', isOver)
  if (isOver) {
    // flag = true
    borderColor = '#ff4d4f'
  }
  // changeInCol(flag)

  return (
    <div ref={drop} className={styles.cardCol} style={getStyle(borderColor)}>
      {text}
      <br />
      {hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}
    </div>
  )
}
export default CardCol
