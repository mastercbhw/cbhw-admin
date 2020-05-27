import React, { useState } from 'react'
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

const CardCol = props => {
  // const { parentHoverIndex, index, moveCard, col } = props
  const [hasDropped, setHasDropped] = useState(false)

  const [{ isOver }, drop] = useDrop({
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
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
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
      {hasDropped ? 'aa' : 'bb'}
    </div>
  )
}

export default CardCol
