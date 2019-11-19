/**
 * filename: Card
 * overview: 根据放入 Box 生成的 Card 组件
 */

import React, { useRef, useMemo, useCallback } from 'react';
import { Row, Col, Input, Radio, Checkbox, Select, DatePicker, Divider, Form } from 'antd'
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames'
import Title from './components/Title'
import ItemTypes from './ItemTypes';
import CardCol from './CardCol'
import styles from './Card.less'

const { Option } = Select
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Card = ({ id, name, col, index, eleType, moveCard, addInitCard, removeInitCard, ...props }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    canDrop(item, monitor) {
      if (col !== 24) {
        removeInitCard()
      }
      if (col === 24 && item.isPageEle) {
        addInitCard()
      }

      return col === 24
    },

    hover(item, monitor) {
      const canDrop = monitor.canDrop()
      if (!ref.current || !canDrop) {
        return;
      }

      const { id: draggedId, index: dragIndex } = item
      const hoverIndex = index
      moveCard(draggedId, hoverIndex, dragIndex, col, id, monitor)
    },
  });

  const [{ opacity }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index, col },
    isDragging(monitor) {
      return monitor.getItem().id === id
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
    // item 中包含 index 属性，则在 drop 组件 hover 和 drop 是可以根据第一个参数获取到 index 值
  });


  const currentElement = useMemo(() => {
    let element = null

    if (col === 8) {
      element = (
        <Row gutter={10}>
          <Col span={8} key="123" ><CardCol col={8} parentHoverIndex={index} index={1} /></Col>
          <Col span={8} key="456" ><CardCol col={8} parentHoverIndex={index} index={2} /></Col>
          <Col span={8} key="789" ><CardCol col={8} parentHoverIndex={index} index={3} /></Col>
        </Row>
      )
    } else if (col === 12) {
      element = (
        <Row gutter={10}>
          <Col span={12} ><CardCol col={12} parentHoverIndex={index} index={1} /></Col>
          <Col span={12} ><CardCol col={12} parentHoverIndex={index} index={2} /></Col>
        </Row>
      )
    } else {
      element = null
    }
    return element
  }, [col])


  const RenderEle = useMemo(() => {
    let ele = null
    switch (eleType) {
      case 'input':
        ele = (
          <FormItem label={name} {...formItemLayout}>
            <Input placeholder="" style={{ width: '100%' }} />
          </FormItem>
        )
        break;
      case 'radio':
        ele = (
          <FormItem label={name} {...formItemLayout}>
            <Radio.Group style={{ width: '100%' }}>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </Radio.Group>
          </FormItem>
        )
        break;
      case 'datepicker':
        ele = (
          <FormItem label={name} {...formItemLayout}>
            <DatePicker style={{ width: '100%' }} />
          </FormItem>
        )
        break;
      case 'select':
        ele = (
          <FormItem label={name} {...formItemLayout}>
            <Select style={{ width: '100%' }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </FormItem>
        )
        break;
      case 'checkbox':
        ele = (
          <FormItem label={name} {...formItemLayout}>
            <Checkbox.Group
              style={{ width: '100%' }}
              options={
                [
                  { label: 'Apple', value: 'Apple' },
                  { label: 'Pear', value: 'Pear' },
                  { label: 'Orange', value: 'Orange' },
                ]
              }
              disabled
            />
          </FormItem>
        )
        break;
      case 'divider':
        ele = (
          <Divider />
        )
        break;

      case 'title':
        ele = (
          <Title title={name} />
        )
        break;
      default:
        break;
    }
    return ele
  }, [eleType])

  // 使用 drag 和 drop 对 ref 进行包裹，则组件既可以进行拖拽也可以接收拖拽组件
  drag(drop(ref));


  return (
    <div
      ref={ref}
      className={classNames({
        [styles.cardItem]: true,
        [styles.cardItem]: id !== -1,
        [styles.cardItemInit]: id === -1,
        [styles.cardItemColWarp]: id !== -1 && col !== 24,
      })}
      style={{ opacity }}
    >
      {col === 24 ? RenderEle : currentElement}
    </div>
  )
}

export default Card;
