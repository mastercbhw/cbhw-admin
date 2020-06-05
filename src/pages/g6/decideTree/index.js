import React, { useEffect, useRef } from 'react'
import { get } from 'lodash'
import { Input } from 'antd'
import G6 from '@antv/g6'
import 'antd/dist/antd.css'


export default () => {
  const chartsRef = useRef()

  useEffect(() => {
    // 模拟数据
    const mockData = [
      {
        id: 'g1',
        name: 'Name1',
        count: 123456,
        label: 'xx Yuan',
        rate: 0.97,
        status: 'S',
        childList: [
          {
            id: 'g12',
            name: 'Deal with Long label',
            count: 123456,
            label: 'xx Yuan',
            rate: 0.123,
            status: 'S',
            childList: [
              {
                id: 'g121',
                name: 'Name3',
                count: 123456,
                label: 'xx Yuan',
                rate: 0.123,
                status: 'S',
                childList: [
                  {
                    id: 'g1211',
                    name: 'Name4',
                    count: 123456,
                    label: 'xx Yuan',
                    rate: 0.123,
                    status: 'I',
                    childList: [],
                  },
                ],
              },
              {
                id: 'g122',
                name: 'Name5',
                count: 123456,
                label: 'xx Yuan',
                rate: 0.96,
                status: 'S',
                childList: [
                  {
                    id: 'g1221',
                    name: 'Name6',
                    count: 123456,
                    label: 'xx Yuan',
                    rate: 0.123,
                    status: 'S',
                    childList: [
                      {
                        id: 'g12211',
                        name: 'Name6-1',
                        count: 123456,
                        label: 'xx Yuan',
                        rate: 0.123,
                        status: 'I',
                        childList: [],
                      },
                    ],
                  },
                  {
                    id: 'g1222',
                    name: 'Name7',
                    count: 123456,
                    label: 'xx Yuan',
                    rate: 0.123,
                    status: 'S',
                    childList: [],
                  },
                ],
              },
              {
                id: 'g123',
                name: 'Name8',
                count: 123456,
                label: 'xx Yuan',
                rate: 0.23,
                status: 'S',
                childList: [
                  {
                    id: 'g1231',
                    name: 'Name8-1',
                    count: 123456,
                    label: 'xx Yuan',
                    rate: 0.123,
                    status: 'I',
                    childList: [],
                  },
                ],
              },
            ],
          },
          {
            id: 'g13',
            name: 'Name9',
            count: 123456,
            label: 'xx Yuan',
            rate: 0.123,
            status: 'S',
            childList: [
              {
                id: 'g131',
                name: 'Name10',
                count: 123456,
                label: 'xx Yuan',
                rate: 0.123,
                status: 'I',
                childList: [],
              },
              {
                id: 'g132',
                name: 'Name11',
                count: 123456,
                label: 'xx Yuan',
                rate: 0.123,
                status: 'I',
                childList: [],
              },
            ],
          },
          {
            id: 'g14',
            name: 'Name12',
            count: 123456,
            label: 'xx Yuan',
            rate: 0.123,
            status: 'I',
            childList: [],
          },
        ],
      },
    ];

    //  组件props
    const props = {
      data: mockData,
      config: {
        padding: [20, 50],
        defaultLevel: 3,
        defaultZoom: 0.8,
        modes: { default: ['zoom-canvas', 'drag-canvas'] },
      },
      nodeClick: item => {
        console.log(item);
      },
    };

    // 默认配置
    const defaultConfig = {
      width: 1600,
      height: 800,
      pixelRatio: 1,
      modes: {
        default: ['zoom-canvas', 'drag-canvas'],
      },
      fitView: false,
      animate: true,
      defaultEdge: {
        style: {
          stroke: '#1890FF',
        },
      },
      renderer: 'svg',
    };

    // number to string
    const toString = id => `${id}`;

    /**
     * sleep
     * @param {duration} number unit ms
     */
    const sleep = (duration = 500) => new Promise(resolve => {
      setTimeout(() => {
        resolve('done');
      }, duration);
    });

    // 自定义节点、边
    const registerFn = () => {
      /**
       * 自定义节点
       */
      G6.registerNode(
        'flow-rect',
        {
          shapeType: 'flow-rect',
          draw(cfg, group) {
            const { name = '', lightColor, hasChildren, label, rate, collapsed } = cfg;
            // 逻辑不应该在这里判断
            const rectConfig = {
              width: 204,
              height: 94,
              lineWidth: 1,
              fontSize: 12,
              fill: '#fff',
              radius: 4,
              stroke: lightColor,
              opacity: 1,
            };

            const textConfig = {
              textAlign: 'left',
              textBaseline: 'top',
            };

            const rect = group.addShape('rect', {
              attrs: {
                x: 0,
                y: 0,
                ...rectConfig,
              },
            });

            // label title
            group.addShape('text', {
              attrs: {
                ...textConfig,
                x: 12,
                y: 8,
                text: name.length > 10 ? `${name.substr(0, 10)}...` : name,
                fontSize: 14,
                fill: '#000',
                cursor: 'pointer',
                isTitleShape: true,
              },
            });

            // label count
            group.addShape('text', {
              attrs: {
                ...textConfig,
                x: 12,
                y: 34,
                text: label,
                fontSize: 20,
                fill: '#000',
              },
            });

            // label percentage
            group.addShape('text', {
              attrs: {
                ...textConfig,
                x: 178,
                y: 37,
                text: `${((rate || 0) * 100).toFixed(2)}%`,
                fontSize: 14,
                textAlign: 'right',
                fill: lightColor,
              },
            });

            // bottom line
            group.addShape('rect', {
              attrs: {
                x: 0,
                y: 90,
                width: rectConfig.width,
                height: 4,
                radius: [0, 0, rectConfig.radius, rectConfig.radius],
                fill: '#DCDFE5',
              },
            });

            // bottom percent
            group.addShape('rect', {
              attrs: {
                x: 0,
                y: 90,
                width: 100,
                height: 4,
                radius: [0, 0, 0, rectConfig.radius],
                fill: lightColor,
              },
            });

            group.addShape('dom', {
              attrs: {
                x: 40,
                y: 40,
                width: 50,
                height: 50,
                // radius: [0, 0, 0, rectConfig.radius],
                fill: lightColor,
                html: `
                  <div onclick="alert('Hi')" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px;">
                      aaaa
                  </div>
                `
              },
              draggable: true
            });

            if (hasChildren) {
              // collapse circle
              group.addShape('circle', {
                attrs: {
                  x: rectConfig.width,
                  y: rectConfig.height / 2,
                  r: 8,
                  stroke: lightColor,
                  fill: collapsed ? lightColor : '#fff',
                  isCollapseShape: true,
                },
              });

              // collpase text
              group.addShape('text', {
                attrs: {
                  x: rectConfig.width,
                  y: rectConfig.height / 2,
                  width: 16,
                  height: 16,
                  textAlign: 'center',
                  textBaseline: 'middle',
                  text: collapsed ? '+' : '-',
                  fontSize: 16,
                  fill: collapsed ? '#fff' : lightColor,
                  cursor: 'pointer',
                  isCollapseShape: true,
                },
              });
            }

            this.drawLinkPoints(cfg, group);
            return rect;
          },
          update(cfg, item) {
            const group = item.getContainer();
            this.updateLinkPoints(cfg, group);
          },
          setState(name, value, item) {
            if (name === 'click' && value) {
              const group = item.getContainer();
              const { collapsed } = item.getModel();
              const [, , , , , , CircleShape, TextShape] = group.get('children');
              if (TextShape) {
                const {
                  attrs: { stroke },
                } = CircleShape;
                if (!collapsed) {
                  TextShape.attr({
                    text: '-',
                    fill: stroke,
                  });
                  CircleShape.attr({
                    fill: '#fff',
                  });
                } else {
                  TextShape.attr({
                    text: '+',
                    fill: '#fff',
                  });
                  CircleShape.attr({
                    fill: stroke,
                  });
                }
              }
            }
          },
          getAnchorPoints() {
            return [
              [0, 0.5],
              [1, 0.5],
            ];
          },
        },
        // 注意这里继承了 'single-shape'
        'rect',
      );

      G6.registerEdge(
        'flow-cubic',
        {
          getControlPoints(cfg) {
            let { controlPoints } = cfg; // 指定controlPoints
            if (!controlPoints || !controlPoints.length) {
              const { startPoint, endPoint, sourceNode, targetNode } = cfg;
              const { x: startX, y: startY, coefficientX, coefficientY } = sourceNode
                ? sourceNode.getModel()
                : startPoint;
              const { x: endX, y: endY } = targetNode ? targetNode.getModel() : endPoint;
              let curveStart = (endX - startX) * coefficientX;
              let curveEnd = (endY - startY) * coefficientY;
              curveStart = curveStart > 40 ? 40 : curveStart;
              curveEnd = curveEnd < -30 ? curveEnd : -30;
              controlPoints = [
                { x: startPoint.x + curveStart, y: startPoint.y },
                { x: endPoint.x + curveEnd, y: endPoint.y },
              ];
            }
            return controlPoints;
          },
          getPath(points) {
            const path = [];
            path.push(['M', points[0].x, points[0].y]);
            path.push([
              'C',
              points[1].x,
              points[1].y,
              points[2].x,
              points[2].y,
              points[3].x,
              points[3].y,
            ]);
            return path;
          },
        },
        'single-line',
      );


      G6.registerNode('dom-node', {
        draw: (cfg, group) => {
          return group.addShape('dom', {
            attrs: {
              width: 200,
              height: 90,
              // 传入 DOM 的 html，带有原生 onclick 事件
              html: `
              <div style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${200 - 5}px; height: ${90 - 5}px; display: flex;">
                <div style="height: 100%; width: 33%; background-color: #CDDDFD">
                  <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />
                </div>
                <span style="margin:auto; padding:auto; color: #5B8FF9">
                  <Input />
                </span>
              </div>
                `
            },
            draggable: true
          });
        },
      }, 'single-node');


    };

    registerFn();


    const { data } = props;
    let backUpData;
    let maxMatrixY = 0;
    let isAnimating = false;
    let graph = null;

    const initGraph = (data) => {
      if (!data || !chartsRef) {
        return;
      }
      transformData(data);
      const { onInit, config } = props;
      graph = new G6.Graph({
        container: chartsRef.current,
        ...defaultConfig,
        ...config,
      });
      initEvent();
      if (typeof onInit === 'function') {
        onInit(graph);
      }
      backUpData = JSON.parse(JSON.stringify(data));
      graph.data(getPosition(data, true));
      graph.render();
      graph.zoom(config.defaultZoom || 1);
      if (data?.length) {
        graph.changeData(getPosition(backUpData));
      }
    };


    // 事件绑定
    const initEvent = () => {
      graph.on('node:click', async (evt) => {
        if (isAnimating) {
          return;
        }
        const { item, target } = evt;
        const {
          attrs: { isCollapseShape },
        } = target;
        if (isCollapseShape) {
          isAnimating = true;
          const model = item.getModel();
          graph.setItemState(item, 'click', true);
          const { childrenKeys, id, collapsed, recordIndex } = model;
          // 更新状态
          if (collapsed) {
            updateCollapseStatus(id, recordIndex, collapsed, 'expand');
            graph.changeData(getExpandPosition(backUpData));
            graph.stopAnimate();
            childrenKeys.forEach(async (key) => {
              const childrenItem = graph.findById(key);
              if (childrenItem) {
                childrenItem.toBack();
              }
            });
            updateCollapseStatus(id, recordIndex, collapsed);
            graph.changeData(getPosition(backUpData));
            await sleep(500);
            graph.setItemState(item, 'click', false);
            isAnimating = false;
          } else {
            updateCollapseStatus(id, recordIndex, collapsed, 'collapsed');
            graph.changeData(getPosition(backUpData));
            childrenKeys.forEach(async (key) => {
              const childrenItem = graph.findById(key);
              if (childrenItem) {
                childrenItem.toBack();
              }
            });
            await sleep(500);
            updateCollapseStatus(id, recordIndex, collapsed);
            childrenKeys.forEach(async (key) => {
              const childrenItem = graph.findById(key);
              if (childrenItem) {
                graph.remove(childrenItem);
              }
            });
            graph.setItemState(item, 'click', false);
            isAnimating = false;
          }
        } else {
          const { nodeClick } = props;
          if (typeof nodeClick === 'function') {
            nodeClick(item.getModel());
          }
        }
      });

      graph.on('node:mouseenter', (evt) => {
        const node = evt.item;
        graph.setItemState(node, 'hover', true);
        graph.updateItem(node, {
          style: {
            ...node._cfg.originStyle,
            shadowColor: '#bbb',
            shadowBlur: 6,
          },
        });
      });

      graph.on('node:mousemove', (evt) => {
        if (isAnimating) {
          return;
        }
        const { item, target, x, y } = evt;
        const {
          attrs: { isTitleShape },
        } = target;
        const model = item.getModel();
        const { name, id } = model;
        if (isTitleShape) {
          const postion = graph.getClientByPoint(x, y);
          createTooltip(postion, name, id);
        } else {
          removeTooltip(id);
        }
      });

      graph.on('node:mouseout', (evt) => {
        if (isAnimating) {
          return;
        }
        const { item, target } = evt;
        const {
          attrs: { isTitleShape },
        } = target;
        const model = item.getModel();
        const { id } = model;
        if (isTitleShape) {
          removeTooltip(id);
        }
      });

      graph.on('node:mouseleave', (evt) => {
        const node = evt.item;
        graph.setItemState(node, 'hover', false);
        graph.updateItem(node, {
          style: {
            ...node._cfg.originStyle,
            shadowColor: 'transparent',
            shadowBlur: 0,
          },
        });
      });
    };

    /**
     * 创建提示
     * @param {postion} 鼠标点击的位置
     * @param {name} string 节点Name
     * @param {id} string 节点id
     */
    const createTooltip = (postion, name, id) => {
      const offsetTop = -60;
      const existTooltip = document.getElementById(id);
      const x = postion.x + 'px';
      const y = postion.y + offsetTop + 'px';
      if (existTooltip) {
        existTooltip.style.left = x;
        existTooltip.style.top = y;
      } else {
        // content
        const tooltip = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = name;
        tooltip.style.padding = '10px';
        tooltip.style.background = 'rgba(0,0,0, 0.65)';
        tooltip.style.color = '#fff';
        tooltip.style.borderRadius = '4px';
        tooltip.appendChild(span);
        // box
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.zIndex = '99';
        div.id = id;
        div.style.left = x;
        div.style.top = y;
        div.appendChild(tooltip);
        document.body.appendChild(div);
      }
    };


    /**
     * 删除提示
     * @param {id} string
     */
    const removeTooltip = (id) => {
      const removeNode = document.getElementById(id);
      if (removeNode) {
        document.body.removeChild(removeNode);
      }
    };

    /**
     * 计算位置
     * @param {data} Array<Item>
     * @param {flag} string[] | string
     * @param {postion} object
     */
    const getPosition = (data, init) => {
      maxMatrixY = 0;
      const graphData = {
        nodes: [],
        edges: [],
      };

      if (!data) {
        return graphData;
      }

      if (init) {
        initAnimateData(data, graphData);
      } else {
        recursion(data, 0, graphData);
      }

      return graphData;
    };


    /**
     * 计算位置
     * @param {data} Array<Item>
     * @param {flag} string[] | string
     * @param {postion} object
     */
    const getExpandPosition = (data) => {
      maxMatrixY = 0;
      const graphData = {
        nodes: [],
        edges: [],
      };

      if (!data) {
        return graphData;
      }

      recursionExpand(data, 0, graphData);

      return graphData;
    };


    /**
     * 展开时的特殊处理
     */
    const recursionExpand = (
      data,
      parentMatrixX,
      graphData,
      parentX,
      parentY,
      parentAnimate,
    ) => {
      if (!data || !data.length) {
        return;
      }
      data.forEach((item, index) => {
        const matrixX = parentMatrixX || 0;
        const children = get(item, 'childList', []);
        const animate = get(item, 'animate', false);
        const afterDrawHidden = get(item, 'afterDrawHidden', false);
        const collapsed = get(item, 'collapsed');
        const currentX = parentAnimate === 'expand' ? parentX : item.x;
        const currentY = parentAnimate === 'expand' ? parentY : item.y;

        item = {
          ...item,
          id: toString(item.id),
          x: currentX,
          y: currentY,
          hasChildren: children.length,
        };
        data[index] = item;
        const { childList, ...model } = item;
        graphData.nodes.push(model);

        if ((children.length && animate) || (children.length && !collapsed)) {
          recursionExpand(
            children,
            afterDrawHidden ? matrixX : matrixX + 1,
            graphData,
            currentX,
            currentY,
            animate,
          );
        }
      });
    };


    /**
     * 数据转换，生成图表数据
     */
    const transformData = (data, parentIndex) => {
      if (!data || !data.length) {
        return;
      }
      const {
        config: { defaultLevel = 10, padding = [20, 20] },
      } = props;
      data.forEach((item, index) => {
        const { status, rate } = item;
        const children = get(item, 'childList', []);
        const recordIndex = parentIndex !== undefined ? parentIndex + '-' + index : index + '';
        maxMatrixY = index === 0 ? maxMatrixY : maxMatrixY + 1;
        const recordLength = recordIndex.split('-').length;
        const childrenKeys = [];
        if (children.length) {
          getKeys(children, childrenKeys);
        }
        let lightColor;
        if (status === 'I') {
          lightColor = '#DCDFE5';
        } else {
          lightColor = rate >= 0.95 ? '#1890FF' : '#EB2F96';
        }
        item = {
          ...item,
          lightColor,
          id: toString(item.id),
          x: padding[0],
          y: padding[1],
          recordIndex,
          collapsed: recordLength >= defaultLevel,
          hasChildren: children.length,
          childrenKeys,
        };
        data[index] = item;
        if (children.length) {
          transformData(get(item, 'childList', []), recordIndex);
        }
      });
    };

    /**
     * 生成初始化数据，为了动画而动画
     */
    const initAnimateData = (data, graphData) => {
      if (!data || !data.length) {
        return;
      }
      data.forEach(item => {
        const children = get(item, 'childList', []);
        const collapsed = get(item, 'collapsed');
        const { childList, ...model } = item;
        graphData.nodes.push(model);
        if (children.length && !collapsed) {
          initAnimateData(get(item, 'childList', []), graphData);
        }
      });
    };


    /**
     * 递归
     */
    const recursion = (
      data,
      parentMatrixX,
      graphData,
      parentId,
      parentX,
      parentY,
      parentAnimate,
    ) => {
      if (!data || !data.length) {
        return;
      }
      const {
        config: { padding = [20, 20], nodesMargin = [250, 100], coefficient = [0.2, -0.1] },
      } = props;
      data.forEach((item, index) => {
        const matrixX = parentMatrixX || 0;
        const children = get(item, 'childList', []);
        const animate = get(item, 'animate', false);
        const afterDrawHidden = get(item, 'afterDrawHidden', false);
        const collapsed = get(item, 'collapsed');
        maxMatrixY = index === 0 || afterDrawHidden ? maxMatrixY : maxMatrixY + 1;

        const currentX =
          afterDrawHidden || parentAnimate === 'expand'
            ? parentX
            : matrixX * nodesMargin[0] + padding[0];
        const currentY =
          afterDrawHidden || parentAnimate === 'expand'
            ? parentY
            : maxMatrixY * nodesMargin[1] + padding[1];

        item = {
          ...item,
          id: toString(item.id),
          matrixX,
          matrixY: maxMatrixY,
          x: currentX,
          y: currentY,
          // type: 'flow-rect',
          type: 'dom-node',
          coefficientX: coefficient[0],
          coefficientY: coefficient[1],
          hasChildren: children.length,
          collapsed: item.collapsed || false,
        };
        data[index] = item;
        const { childList, ...model } = item;
        graphData.nodes.push(model);

        if (parentId) {
          graphData.edges.push({
            source: parentId,
            target: toString(item.id),
            targetAnchor: 0,
            sourceAnchor: 1,
            type: index === 0 ? 'line' : 'flow-cubic',
          });
        }

        if ((children.length && animate) || (children.length && !collapsed)) {
          recursion(
            children,
            afterDrawHidden ? matrixX : matrixX + 1,
            graphData,
            toString(item.id),
            currentX,
            currentY,
            animate,
          );
        }
      });
    };


    /**
     * 获取keys, 折叠、展开时直接使用
     * @param {data} ListItem
     * @param {keys} string[]
     */
    const getKeys = (data, keys) => {
      if (!data || !data.length) {
        return;
      }
      data.forEach(item => {
        const { id } = item;
        const children = get(item, 'childList', []);
        keys.push(id);
        if (children.length) {
          getKeys(children, keys);
        }
      });
    };


    /**
     * 更新当前数据的collapse状态以及子节点的afterDrawHidden状态
     * @param {id} string
     * @param {recordIndex} string 节点索引
     * @param {collapsed} boolean
     */
    const updateCollapseStatus = (
      id,
      recordIndex,
      collapsed,
      animate,
    ) => {
      let currentList = backUpData;
      try {
        let currentRecord;
        const indexs = recordIndex.split('-');
        for (let i = 0; i < indexs.length; i += 1) {
          currentRecord = currentList[indexs[i]];
          currentList = currentList[indexs[i]].childList;
        }
        currentRecord.collapsed = !collapsed;
        currentRecord.animate = animate;

        const setHidden = (data) => {
          if (!data || !data.length) {
            return;
          }
          data.forEach((item, index) => {
            const children = get(item, 'childList', []);
            data[index] = {
              ...item,
              afterDrawHidden: !collapsed,
            };
            if (children.length && !item.collapsed) {
              setHidden(children);
            }
          });
        };
        setHidden(currentList);
      } catch (err) {
        console.error(err, id, currentList);
      }
    };

    initGraph(data);
  }, [])

  return (
    <div ref={chartsRef}>

    </div>
  )
}
