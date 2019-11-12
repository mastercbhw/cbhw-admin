import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from '../itemTypes'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const ColItem = ({ id, text, index, moveCard }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: [ItemTypes.COLITEM],
    hover(item, monitor) {
      console.log(2)
      if (!ref.current) {
        return
      }
      if (item.type === 'colItem') {
        const dragIndex = item.index
        const hoverIndex = index
        // Don't replace items with themselves
        // 不要自己替换自己
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        // 确定屏幕上的矩形
        const hoverBoundingRect = ref.current.getBoundingClientRect()
        // Get vertical middle
        // 获取垂直居中的距离
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        // 确定鼠标的位置
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        // 将像素移动到顶部
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // 只有当鼠标移动了一半的物品高度时才进行移动
        // 向下拖动时，仅当光标低于50%时移动
        // 向上拖动时，仅当光标超过50%时移动


        // Dragging downwards
        // 向下拖动
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        // 向上拖动
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.

        // 注意:我们正在修改监视器项!
        // 一般来说，避免突变比较好，
        // 但是这里是为了表现好
        // 为了避免昂贵的索引搜索。
        item.index = hoverIndex
      }
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.COLITEM, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      {text}
    </div>
  )
}
export default ColItem
