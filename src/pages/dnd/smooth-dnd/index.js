import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Col } from 'antd'
import { applyDrag, generateItems } from './utils';
import styles from './index.less'

class Copy extends Component {
  constructor() {
    super();

    this.state = {
      items1: [
        { id: 1, label: '标题栏', icon: 'apple', data: '标题栏apple' },
        { id: 2, label: '单选框', icon: 'windows', data: '单选框windows' },
        { id: 3, label: '多选框', icon: 'chrome', data: '多选框chrome' },
        { id: 4, label: '输入框', icon: 'github', data: '输入框github' },
        { id: 5, label: '标题', icon: 'aliwangwang', data: '标题aliwangwang' },
      ],
      // items2: generateItems(15, i => ({ id: `2${i}`, data: `Draggable 2 - ${i}` })),
      items2: [],
      items3: [
        { id: 6, label: '两格', icon: 'aa', data: '两格', col: 12 },
        { id: 7, label: '三格', icon: 'bb', data: '三格', col: 8 },
      ],
      items4: [
        { id: 8, label: 'aaaa', icon: 'bb', data: 'aaaa', col: 8 },
        { id: 9, label: 'vvv', icon: 'bb', data: 'bbb', col: 8 },
        { id: 10, label: 'bbbb', icon: 'bb', data: 'ccc', col: 8 },
      ],
    }
  }


  render() {
    const { items1, items2, items3, items4 } = this.state
    console.log('TCL: Copy -> render -> items2', items2)
    return (
      <div className={styles['config-form']}>
        <div className={styles['left-content']}>
          <Container
            groupName="1"
            behaviour="copy"
            getChildPayload={i => this.state.items1[i]}
            onDrop={
              e => this.setState({ items1: applyDrag(items1, e) })
            }
          >
            {
              items1.map((p, i) => (
                <Draggable key={i}>
                  <div className={styles['draggable-item']}>
                    {p.label}
                  </div>
                </Draggable>
              ))
            }
          </Container>
          <Container
            groupName="1"
            behaviour="copy"
            getChildPayload={i => this.state.items3[i]}
            onDrop={
              e => this.setState({ items3: applyDrag(items3, e) })
            }
          >
            {
              items3.map((p, i) => (
                <Draggable key={i}>
                  <div className={styles['draggable-item']}>
                    {p.label}
                  </div>
                </Draggable>
              ))
            }
          </Container>
        </div>
        <div className={styles['center-content']}>
          <Container
            groupName="1"
            getChildPayload={i => items2[i]}
            dropPlaceholder
            orientation="vertical"
            onDrop={e => {
              console.log(e)
              this.setState({ items2: applyDrag(items2, e) })
            }}
          >
            {
              items2.map((p, i) => {
                if (p.col) {
                  return (
                    <Draggable key={i}>
                      <div className={styles['col-warp']}>
                        <Container
                          groupName="1"
                          getChildPayload={j => items4[j]}
                          dropPlaceholder
                          orientation="horizontal"
                          behaviour="contain"
                          onDrop={e => {
                            console.log(e)
                            this.setState({ items4: applyDrag(items4, e) })
                          }}
                          style={{ display: 'flex' }}
                        >
                          {
                            items4.map((q, j) => (
                              <Draggable key={`${i}${j}`} style={{ flexBasis: '33%' }}>

                                <Col span={24} className={styles['draggable-item']}>
                                  {p.data}
                                </Col>

                              </Draggable>
                            ))
                          }
                        </Container>
                      </div>
                    </Draggable>
                  )
                }
                return (
                  <Draggable key={i}>
                    <div className={styles['col-warp']}>
                      <Col span={p.col || 24} className={styles['draggable-item']}>
                        {p.data}
                      </Col>
                    </div>
                  </Draggable>
                )
              })
            }
          </Container>
        </div>
        <div className={styles['right-content']}>

        </div>
      </div >
    );
  }
}

Copy.propTypes = {

};

export default Copy;
