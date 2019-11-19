import React, { useState, useCallback } from 'react'
import { useDrag } from 'react-dnd'
import { Tabs, Button } from 'antd'
import classNames from 'classnames'
import update from 'immutability-helper'
import nanoid from 'nanoid'
import ItemTypes from './ItemTypes'

import styles from './Container.less'
import List from './List'

const { TabPane } = Tabs

const dragButtonData = [
  { icon: 'search', name: '标签', id: 1, col: 24, isPageEle: true, eleType: 'title' },
  { icon: 'search', name: '文本框', id: 2, col: 24, isPageEle: true, eleType: 'input' },
  { icon: 'search', name: '单选', id: 3, col: 24, isPageEle: true, eleType: 'radio' },
  { icon: 'search', name: '复选', id: 4, col: 24, isPageEle: true, eleType: 'checkbox' },
  { icon: 'search', name: '下拉列表', id: 5, col: 24, isPageEle: true, eleType: 'select' },
  { icon: 'search', name: '日期时间', id: 6, col: 24, isPageEle: true, eleType: 'datepicker' },
  { icon: 'search', name: '分割线', id: 7, col: 24, isPageEle: true, eleType: 'divider' },
]

// 可拖拽的题型组件
const DragButton = ({ cardList, changeCardList, icon, name, id, isPageEle, ...props }) => {
  const gragBtnItem = {
    type: ItemTypes.CARD,
    id,
    name,
    isPageEle,
    ...props,
  }
  const [, drag] = useDrag({
    item: gragBtnItem,
    begin: () => {
      const useless = cardList.find(item => item.id === -1);
      // 拖拽开始时，向 cardList 数据源中插入一个占位的元素，如果占位元素已经存在，不再重复插入
      if (!useless) {
        changeCardList([...cardList, { name: '请移动到这里', id: -1, col: 24 }]);
      }
      return gragBtnItem;
    },
    end: (_, monitor) => {
      if (monitor.didDrop()) {
        // 拖拽到targets后松手
        const unquieid = nanoid()
        const uselessIndex = cardList.findIndex(item => item.id === -1);
        // 更新 cardList 数据源
        const splictObj = { ...monitor.getItem(), id: unquieid }

        if (typeof uselessIndex === 'number' && uselessIndex !== -1) {
          changeCardList(update(cardList, {
            $splice: [[uselessIndex, 1, splictObj]],
          }))
        }
      } else {
        // 没有拖拽到targets
        const uselessIndex = cardList.findIndex(item => item.id === -1);
        if (typeof uselessIndex === 'number' && uselessIndex !== -1) {
          changeCardList(update(cardList, {
            $splice: [[uselessIndex, 1]],
          }))
        }
      }
    },
  })
  return (
    <span ref={drag} className={styles.dragButtonWarp}>
      <Button icon={icon} size="small" className={styles.buttonSelf}>{name}</Button>
    </span>
  )
}


const GridItemData = [
  { col: 12, index: 1, name: '两栏', id: 'girdItem1', isPageEle: true },
  { col: 8, index: 2, name: '三栏', id: 'girdItem2', isPageEle: true },
]

// 栅格组件
const GridItemDrag = ({ cardList, changeCardList, id, index, name, isPageEle, ...props }) => {
  const gridItem = {
    type: ItemTypes.CARD,
    id,
    name,
    isPageEle,
    ...props,
  }
  const [, drag] = useDrag({
    item: gridItem,
    begin: () => {
      const useless = cardList.find(item => item.id === -1);
      // 拖拽开始时，向 cardList 数据源中插入一个占位的元素，如果占位元素已经存在，不再重复插入
      if (!useless) {
        changeCardList([...cardList, { name: '请移动到这里', id: -1, col: 24 }]);
      }
      return gridItem;
    },
    end: (_, monitor) => {
      if (monitor.didDrop()) {
        // 拖拽到targets后松手
        const unquieid = nanoid()
        const uselessIndex = cardList.findIndex(item => item.id === -1);
        // 更新 cardList 数据源
        changeCardList(update(cardList, {
          $splice: [[uselessIndex, 1, { ...monitor.getItem(), id: unquieid }]],
        }))
      } else {
        // 没有拖拽到targets
        const uselessIndex = cardList.findIndex(item => item.id === -1);
        if (uselessIndex) {
          changeCardList(update(cardList, {
            $splice: [[uselessIndex, 1]],
          }))
        }
      }
    },
  })

  return (
    <div ref={drag} className={classNames({ [styles.girdItem]: true, [styles.girdItem1]: index === 1, [styles.girdItem2]: index === 2 })}>
    </div>
  )
}

const Container = () => {
  const [tabKey, setTabKey] = useState('1') // tab的activeKey
  const [cardList, setCardList] = useState([]) // 页面中间展示的列表数据

  const changeCardList = list => {
    setCardList([...list])
  }

  // 可拖拽的题型组件集合
  const DragButtonList = useCallback(() => (
    <div className={styles.dragButtonList}>
      {
        dragButtonData.map(item => (
          <DragButton key={item.name} cardList={cardList} changeCardList={changeCardList} {...item} />
        ))
      }
    </div>
  ), [cardList])


  // 两格和三格 的组件
  const GridItemList = useCallback(() => (
    <div className={styles.girdLayoutContent}>
      {GridItemData.map(item => (
        <GridItemDrag key={item.id} cardList={cardList} changeCardList={changeCardList} {...item} />
      ))}
    </div>
  ), [cardList])


  // 页面中间展示列表
  const ListRender = useCallback(() => <List cardList={cardList} changeCardList={changeCardList} />, [cardList])

  return (
    <div className={styles.containerWarp}>
      <div className={styles.containerLeft}>
        <Tabs
          defaultActiveKey="1"
          style={{ textAlign: 'center' }}
          size="small"
          activeKey={tabKey}
          onChange={activeKey => { setTabKey(activeKey) }}
        >
          <TabPane tab="题型" key="1">
            <div style={{ textAlign: 'left' }}>
              {DragButtonList()}
              <div className={styles.girdLayoutWarp}>
                <div>布局</div>
                {GridItemList()}
              </div>
            </div>
          </TabPane>
          <TabPane tab="模板" key="2">
            模板
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.containerContent}>
        {ListRender()}
      </div>
      <div className={styles.containerRight}>
        c
      </div>
    </div>
  )
}

export default Container
