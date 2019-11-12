import React from 'react'
import { Button } from 'antd'
import { useDrag } from 'react-dnd'
import ItemTypes from '../itemTypes'
import styles from './item.less'


const DragButton = ({ icon, name }) => {
  const [collectedProps, drag] = useDrag({
    item: { type: ItemTypes.BASICITEM, id: name },
  })
  return (
    <span ref={drag} className={styles.buttonWarp}>
      <Button icon={icon} size="small" className={styles.buttonSelf}>{name}</Button>
    </span>
  )
}

const FormBasicItem = () => {
  const data = [
    { icon: 'search', name: '标签' },
    { icon: 'search', name: '文本' },
    { icon: 'search', name: '单选' },
    { icon: 'search', name: '复选' },
    { icon: 'search', name: '下拉列表' },
    { icon: 'search', name: '日期时间' },
    { icon: 'search', name: '分割线' },
  ]

  return (
    <div className={styles.itemWarp}>
      {
        data.map(item => (
          <DragButton key={item.name} {...item} />
        ))
      }
    </div>
  )
}


export default FormBasicItem
// export default DragButton
