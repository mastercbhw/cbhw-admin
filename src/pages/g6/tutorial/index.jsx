import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Layout } from 'antd'
import G6 from '@antv/g6';
import request from '@/utils/request'
import styles from './index.less'

const { Content } = Layout

export default function () {
  const ref = React.useRef(null);
  let graph = null;

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ref.current,
        width: 800,
        height: 800,
        // fitView: true,
        // fitViewPadding: [20, 40, 50, 20],
        layout: {
          type: 'force',
          linkDistance: 100,
          preventOverlap: true,
          nodeStrength: -30,
          edgeStrength: 0.1,
        },
        // 内置交互
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        defaultNode: {
          size: 30, // 节点大小
          type: 'circle',
          color: '#000',
          style: {
            fill: 'steelblue', // 节点填充色
            stroke: '#666', // 节点描边色
            lineWidth: 1, // 节点描边粗细
          },
          // 节点上的标签文本配置
          labelCfg: {
            // 节点上的标签文本样式配置
            style: {
              fill: '#fff', // 节点标签文字颜色
            },
          },
        },
        defaultEdge: {
          // ...                 // 边的其他配置
          // 边样式配置
          style: {
            opacity: 0.6, // 边透明度
            stroke: 'grey', // 边描边颜色
          },
          // 边上的标签文本配置
          labelCfg: {
            autoRotate: true, // 边上的标签文本根据边的方向旋转
            refY: 10,
          },
        },
      });
    }

    graph.on('node:mouseenter', e => {
      const nodeItem = e.item; // 获取鼠标进入的节点元素对象
      graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
    });

    // 鼠标离开节点
    graph.on('node:mouseleave', e => {
      const nodeItem = e.item; // 获取鼠标离开的节点元素对象
      graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
    });

    // 点击节点
    graph.on('node:click', e => {
      // 先将所有当前是 click 状态的节点置为非 click 状态
      const clickNodes = graph.findAllByState('node', 'click');
      clickNodes.forEach(cn => {
        graph.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item; // 获取被点击的节点元素对象
      graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
    });

    // 点击边
    graph.on('edge:click', e => {
      // 先将所有当前是 click 状态的边置为非 click 状态
      const clickEdges = graph.findAllByState('edge', 'click');
      clickEdges.forEach(ce => {
        graph.setItemState(ce, 'click', false);
      });
      const edgeItem = e.item; // 获取被点击的边元素对象
      graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
    });

    request('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json').then(res => {
      console.log('res', res)
      graph.data(res);
      graph.render();
    })
    // graph.data(initData);
    // graph.render();
  }, []);

  return (
    <PageHeaderWrapper
      title="g6树状查询条件"
      content="antv/G6的应用"
    >
      <Content className={styles.simpleContent}>
        <div ref={ref}></div>
      </Content>
    </PageHeaderWrapper>
  );
}
