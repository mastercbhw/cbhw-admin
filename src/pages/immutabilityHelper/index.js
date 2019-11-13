
import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Layout, Button, Col } from 'antd'
import update from 'immutability-helper'

const { Content } = Layout


class ImmHelper extends PureComponent {
  spliceHandle = () => {
    const arr = [1, 2, 3, 4, 5, 66];
    const arr2 = update(arr, {
      $splice: [[1, 2, [66788, 99], { a: 123, b: '苏南' }]], // or [0,1,"从我开始是插入的内容",88,89,90,"后面可以很多，是数组、对象、字符串都行"]
    });

    const arr3 = update(arr, {
      $splice: [[0, 1, '从我开始是插入的内容', 88, 89, 90, '后面可以很多，是数组、对象、字符串都行']], // or
    });
    console.log('TCL: ImmHelper -> spliceHandle -> arr', arr)
    console.log('TCL: ImmHelper -> spliceHandle -> arr2', arr2)
    console.log('TCL: ImmHelper -> spliceHandle -> arr3', arr3)


    // 复杂一些的用法：
    const obj = {
      name: 'immutable',
      list: [1, 2, [90, 55, 44, 3, 22, 55], 3, 4, 6, 7, 8],
    };
    const obj2 = update(obj, {
      list: {
        2: value => update(value, {
          $splice: [[0, 2]], // [90,55,44,3,22,55] => [44, 3, 22, 55]
        }),
      },
    });
    console.log('TCL: ImmHelper -> spliceHandle -> obj', obj)
    console.log('TCL: ImmHelper -> spliceHandle -> obj2', obj2)
  }

  unshiftHandle = () => {
    const arr = [1, 2, 3, 4, 5, 66];
    const arr2 = update(arr, {
      $unshift: ['a', 'b', 'c'],
      4: {
        $set: '我是首席填坑官∙苏南', // 这里需要注意，它的操作是在 unshift 之前执行的，也就是在原 arr 上查找 第 4 个下标
      },
    });
    console.log('TCL: ImmHelper -> unshiftHandle -> arr2 原始数组', arr2)
    console.log('TCL: ImmHelper -> unshiftHandle -> arr', arr)
  }

  render() {
    return (
      <PageHeaderWrapper
        title="immutability-helper的api使用"
        content="打开控制台看具体数据走向"
      >
        <Content>
          <Button type="primary" style={{ margin: 10 }} onClick={this.spliceHandle}>$splice</Button>
          <Button type="primary" style={{ margin: 10 }} onClick={this.unshiftHandle}>$unshift</Button>
        </Content>
      </PageHeaderWrapper>
    );
  }
}


export default ImmHelper;
