import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor,
    padding: '2rem',
    paddingTop: '1rem',
    margin: '1rem',
    textAlign: 'center',
    float: 'left',
    fontSize: '1rem',
  }
}

/**
 *
 * @param {number} parentHoverIndex 父元素划过的索引
 * @param {number} index 当前的索引
 */

const CardCol = ({ greedy, parentHoverIndex, index, children }) => {
  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item, monitor) {
      if (!item.col || (item.hasOwnProperty('col') && item.col !== 24)) {
        return
      }
      const didDrop = monitor.didDrop()
      if (didDrop && !greedy) {
        return
      }
      console.log('TCL: CardCol drop -> item', item)
      console.log('TCL: CardCol -> parentHoverIndex', parentHoverIndex)
      console.log('TCL: CardCol -> index', index)


      setHasDropped(true)
      setHasDroppedOnChild(didDrop)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })
  const text = greedy ? 'greedy' : 'not greedy'
  let backgroundColor = 'rgba(0, 0, 0, .5)'
  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = 'darkgreen'
  }
  return (
    <div ref={drop} style={getStyle(backgroundColor)}>
      {text}
      <br />
      {hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}

      {/* <div>{children}</div> */}
    </div>
  )
}
export default CardCol
