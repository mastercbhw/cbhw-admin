import G6 from '@antv/g6';
import React, { useEffect, useRef } from 'react';
import './registerShape';

const initdata = {
  isRoot: true,
  id: 'Root',
  style: {
    fill: 'red',
  },
  children: [
    {
      id: 'SubTreeNode1',
      raw: {},
      children: [
        {
          id: 'SubTreeNode1.1',
        },
        {
          id: 'SubTreeNode1.2',
          children: [
            {
              id: 'SubTreeNode1.2.1',
            },
            {
              id: 'SubTreeNode1.2.2',
            },
            {
              id: 'SubTreeNode1.2.3',
            },
          ],
        },
      ],
    },
    {
      id: 'SubTreeNode2',
      children: [
        {
          id: 'SubTreeNode2.1',
        },
      ],
    },
    {
      id: 'SubTreeNode3',
      children: [
        {
          id: 'SubTreeNode3.1',
        },
        {
          id: 'SubTreeNode3.2',
        },
        {
          id: 'SubTreeNode3.3',
        },
      ],
    },
    {
      id: 'SubTreeNode4',
    },
    {
      id: 'SubTreeNode5',
    },
    {
      id: 'SubTreeNode6',
    },
    {
      id: 'SubTreeNode7',
    },
    {
      id: 'SubTreeNode8',
    },
    {
      id: 'SubTreeNode9',
    },
    {
      id: 'SubTreeNode10',
    },
    {
      id: 'SubTreeNode11',
    },
  ],
};


export default function () {
  let graph = null
  const chartsRef = useRef()
  useEffect(() => {
    const width = 1000;
    const height = 800;
    if (!graph) {
      graph = new G6.TreeGraph({
        container: chartsRef.current,
        width,
        height,
        linkCenter: true,
        modes: {
          default: [
            {
              type: 'collapse-expand',
              onChange: function onChange(item, collapsed) {
                const { data } = item.get('model');
                data.collapsed = collapsed;
                return true;
              },
            },
            'drag-canvas',
            'zoom-canvas',
          ],
        },
        defaultNode: {
          type: 'dom-node',
          // size: 30,
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
        defaultEdge: {
          type: 'cubic-horizontal',
        },
        layout: {
          type: 'compactBox',
          direction: 'LR',
          nodesep: 30,
          ranksep: 100,
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap() {
            return 10;
          },
          getHGap: function getHGap() {
            return 100;
          },
        },
      });
    }

    graph.node(node => ({
      type: 'dom-node',
      size: 16,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      style: {
        fill: '#C6E5FF',
        stroke: '#5B8FF9',
      },
      label: node.id,
      labelCfg: {
        // position: node.children && node.children.length > 0 ? 'left' : 'right',
        position: 'right',
        offset: 5,
      },
    }));

    graph.data(initdata);
    graph.render();
    graph.fitView();
  }, [])

  return (
    <div ref={chartsRef}></div>
  )
}
