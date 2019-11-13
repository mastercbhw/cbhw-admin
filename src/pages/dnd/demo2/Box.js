/**
 * filename: Box
 * overview: 用来承载界面最上方水果类型的 Box 组件
 */

import React from 'react';
import update from 'immutability-helper';
import { useDrag } from 'react-dnd';
import classNames from 'classnames'
import nanoid from 'nanoid'
import ItemType from './ItemTypes';
import styles from './Box.less'


const Box = ({ col, category, cardList, changeCardList, inCol }) => {
  const box = {
    col,
    category,
    type: ItemType.CARD,
  };
  const unquieid = nanoid()

  const [, drag] = useDrag({
    item: box,
    begin: () => {
      const useless = cardList.find(item => item.id === -1);
      // 拖拽开始时，向 cardList 数据源中插入一个占位的元素，如果占位元素已经存在，不再重复插入
      if (!useless) {
        changeCardList([...cardList, { category: '请移动到这里', id: -1, col: 24 }]);
      }
      return box;
    },
    end: (_, monitor) => {
      /**
       * 拖拽结束时，判断是否将拖拽元素放入了目标接收组件中
       *  1、如果是，则使用真正传入的 box 元素代替占位元素
       *  2、如果否，则将占位元素删除
       */
      if (monitor.didDrop()) {
        const uselessIndex = cardList.findIndex(item => item.id === -1);
        // 更新 cardList 数据源
        changeCardList(update(cardList, {
          $splice: [[uselessIndex, 1, { ...monitor.getItem(), id: unquieid }]],
        }))
      } else {
        const uselessIndex = cardList.findIndex(item => item.id === -1);
        // 更新 cardList 数据源
        changeCardList(update(cardList, {
          $splice: [[uselessIndex, 1]],
        }))
      }

      // changeCardList(cardList);
    },

  });
  return (
    <div
      ref={drag}
      className={classNames({
        [styles.boxItem]: true,
      })}
    >{category}</div>
  )
};

export default Box;
