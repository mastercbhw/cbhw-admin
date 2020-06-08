import G6 from '@antv/g6';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Form, Button, message } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { useSize, useDebounceFn } from '@umijs/hooks'
import { searchData, SOURCE_BUTTON, RELATION_BUTTON, RELATION_BUTTON_ONLY, CONDITION_BUTTON_ONLY, CONDITION_BUTTON, REMOVE_BUTTON, SELECT_BUTTON, SEARCH_NODE } from './contant'
import './registerShape';
import NodeContextMenu from './component/contextMenu'
import SearchItem from './component/searchItem'
import NodeTooltip from './component/toolTip'


// 后台基础数据
const backstageBasicData = {
  componetType: '', // 逻辑：LOGIN，条件： CONDITION
  paramName: '', // 条件表达式的值 esField
  paramValue: '', // 参数的值
  andOrType: '', // 与或非
  compareType: '', // 比较类型(大于，等于，小于，包含)
  children: [], // children
}

// 前端需要的字段
const webNeedFields = {
  id: '', // 前端需要的节点id字段(不能为空)
  name: '', // 节点上显示的字段
  type: '', // 节点类型（枚举
  webParamId: '', // 表单节点的真实值 比如[1,12,123]
  webCascaderName: '', // 表单节点的中文
  webCompareTypeName: '',
}

// 关系和条件的基础数据
const relationConBasicData = () => ({
  webParamId: '', // 表单节点的真实值 比如[1,12,123]
  name: '关系+条件', // 节点上显示的字段
  id: '', // 前端需要的节点id字段(不能为空)
  type: RELATION_BUTTON, // 节点类型（枚举）
  componetType: '', // 逻辑：LOGIN，条件： CONDITION
  paramName: '', // 条件表达式的值 esField
  paramValue: '', // 参数的值
  andOrType: '', // 与或非
  compareType: '', // 比较类型(大于，等于，小于，包含)
  children: [], // children
})

// 排除后面的“条件按钮”的基础数据
const conditionButtonOnlyBasicData = () => ({
  ...backstageBasicData,
  ...webNeedFields,
  webParamId: '', // 表单节点的真实值 比如[1,12,123]
  name: '+条件', // 节点上显示的字段
  id: '', // 前端需要的节点id字段(不能为空)
  type: CONDITION_BUTTON_ONLY, // 节点类型（枚举）
  componetType: 'LOGIN', // 逻辑：LOGIN，条件： CONDITION
  paramName: '', // 条件表达式的值 esField
  paramValue: '', // 参数的值
  andOrType: '', // 与或非
  compareType: '', // 比较类型(大于，等于，小于，包含)
  children: [], // children
})


// 排除按钮的基础数据
const removeBasicData = () => ({
  webParamId: '',
  name: '排除',
  id: '', // 前端需要的节点id字段(不能为空)
  type: REMOVE_BUTTON, // 节点类型（枚举）
  componetType: 'LOGIN', // 逻辑：LOGIN，条件： CONDITION
  paramName: '', // 条件表达式的值 esField
  paramValue: '', // 参数的值
  andOrType: '', // 与或非
  compareType: '', // 比较类型(大于，等于，小于，包含)
  children: [], // children
})


// 新增表单节点 数据处理
const getConditionData = values => ({
  ...backstageBasicData,
  ...webNeedFields,
  id: uuidv4(),
  name: `${values.webCascaderName} ${values.webCompareTypeName} ${values.paramValue}`,
  type: SEARCH_NODE,
  webParamId: values.webParamId,
  webCascaderName: values.webCascaderName,
  webCompareTypeName: values.webCompareTypeName,
  componetType: 'CONDITION',
  paramName: values.paramName,
  paramValue: values.paramValue,
  andOrType: '',
  compareType: values.compareType,
  children: [
    {
      ...removeBasicData(),
      id: uuidv4(),
    },
  ],
})


const initdata = {
  isRoot: true,
  id: 'root',
  x: -61,
  type: 'sourceButton',
  name: '纳入', // 节点需要显示的值
  ...backstageBasicData,
  children: [],
};

// 纳入后添加关系节点
const initDataHasRelation = {
  isRoot: true,
  id: 'root',
  type: 'sourceButton',
  name: '纳入', // 节点需要显示的值
  ...backstageBasicData,
  children: [{
    webParamId: '', // 表单节点的真实值 比如[1,12,123]
    name: '并且', // 节点上显示的字段
    id: 'child1', // 前端需要的节点id字段(不能为空)
    type: SELECT_BUTTON, // 节点类型（枚举）
    componetType: 'LOGIN', // 逻辑：LOGIN，条件： CONDITION
    paramName: '', // 条件表达式的值 esField
    paramValue: '', // 参数的值
    andOrType: 'AND', // 与或非
    compareType: '', // 比较类型(大于，等于，小于，包含)
    children: [
      {
        ...relationConBasicData(),
        id: uuidv4(),
      },
    ],
  }],
}


/**
 *@description 查找id所在的节点，并为其添加兄弟节点
 *
 * */
function addBroNode(data, findId, broData) {
  if (data.length) {
    const newData = data
    const found = newData.some(c => c.id === findId)
    if (found) {
      newData.splice(-1, 0, broData)
      return newData
    }
    return newData.map(item => ({
      ...item,
      children: addBroNode(item.children, findId, broData),
    }))
  }
  return []
}

/**
 * 修改表单节点数据
 * @param {*} data 元数据
 * @param {*} values 修改的数据
 */
function changeSearchItemData(data, findId, values) {
  if (data.length) {
    let newData = data
    const found = newData.some(c => c.id === findId)
    if (found) {
      newData = newData.map(a => {
        if (a.id === findId) {
          return {
            ...a,
            name: `${values.webCascaderName} ${values.webCompareTypeName} ${values.paramValue}`,
            webParamId: values.webParamId,
            webCascaderName: values.webCascaderName,
            webCompareTypeName: values.webCompareTypeName,
            paramName: values.paramName,
            paramValue: values.paramValue,
            compareType: values.compareType,
          }
        }
        return a
      })
      return newData
    }


    return data.map(item => ({
      ...item,
      children: changeSearchItemData(item.children, findId, values),
    }))
  }
  return []
}

function addChildNode(data, findId, values) {
  if (data.length) {
    const newData = data
    const found = newData.some(c => c.id === findId)
    if (found) {
      newData.forEach(c => {
        if (c.id === findId) {
          c.children.push(values)
        }
      })
      return newData
    }

    return newData.map(item => ({
      ...item,
      children: addChildNode(item.children, findId, values),
    }))
  }
  return []
}


// 条件树组件
const SearchTree = props => {
  const { form } = props
  const graphRef = useRef() // 使用ref的current存储graph
  const chartsRef = useRef()

  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false)
  const [nodeContextId, setNodeContextId] = useState()
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0)
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0)


  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [tooltipTitle, setTooltipTitle] = useState('')
  const [nodeTooltipX, setNodeToolTipX] = useState(0)
  const [nodeTooltipY, setNodeToolTipY] = useState(0)


  // searchItem查询节点
  const [showSearchItem, setShowSearchItem] = useState(false)
  const [searchItemId, setSearchItemId] = useState()
  const [searchItemData, setSearchItemData] = useState()
  const [searchItemType, setSearchItemType] = useState() // 点击条件(condition)和点击查询节点(search)
  const [searchItemX, setSearchItemX] = useState(0)
  const [searchItemY, setSearchItemY] = useState(0)

  const [state] = useSize(() => document.querySelector('#treeWarp'))
  // 获取浏览器高度
  const getClientHeight = useCallback(() => {
    let myHeight = 0;
    if (typeof (window.innerHeight) === 'number') {
      myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientHeight)) {
      myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientHeight)) {
      myHeight = document.body.clientHeight;
    }
    return myHeight - 66 - 40 - 64 - (24 * 2) - 10
  }, [])

  const reRender = () => {
    graphRef.current.changeData()
    graphRef.current.moveTo(0, 0)
  }


  useEffect(() => {
    if (!graphRef.current) {
      graphRef.current = new G6.TreeGraph({
        container: chartsRef.current,
        width: 1000,
        height: getClientHeight(),
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
          ],
          readonly: [

          ],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          label: 10,
          labelCfg: {
            style: {
              fill: '#f0f',
            },
          },
          style: {
            stroke: '#A3B1BF',
          },
        },
        minZoom: 0.5,
        maxZoom: 1.5,
        fitView: true,
        fitViewPadding: [0, 0, 0, -200],
        fitCenter: false,
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 30;
          },
          getWidth: function getWidth(d) {
            if (d.id === 'root' || d.id === 'child1' || d.name === '排除' || d.componetType === 'LOGIN') {
              return 80
            }
            return 200;
          },
          getHGap: function getHGap() {
            return 10
          },
        },
        renderer: 'svg',
      });
    }

    const graph = graphRef.current
    // 设置各个节点样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。
    graph.node(node =>
      ({
        type: node.type || 'dom-node',
        // size: 16,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      }),
    );

    graph.data(initdata);
    graph.render();
    graph.moveTo(0, 0)


    graph.on('node:click', event => {
      if (graph.getCurrentMode() === 'readonly') {
        message.destroy()
        message.warn('请先完成表单操作！')
        return
      }

      // 节点上的点击事件
      const { item, shape } = event;
      const model = item.getModel()
      const { x, y, id } = model
      const point = graph.getCanvasByPoint(x, y)

      // 点击纳入按钮，插入关系按钮
      if (shape.attrs.genre === SOURCE_BUTTON) {
        const parentData = graph.findDataById(id)
        if (Array.isArray(parentData.children) && parentData.children.length === 0) {
          parentData.children.push({
            ...backstageBasicData,
            ...webNeedFields,
            componetType: '',
            andOrType: 'AND',
            name: '并且',
            id: uuidv4(),
            type: RELATION_BUTTON_ONLY,
          })
          reRender()
        }
      }


      // 只有一个关系按钮
      if (shape.attrs.genre === RELATION_BUTTON_ONLY) {
        initdata.children = initDataHasRelation.children
        reRender()
      }

      // 点击了下拉组件
      if (shape.attrs.genre === SELECT_BUTTON && shape.cfg.name !== 'closeBtn') {
        setNodeContextId(id)
        setNodeContextMenuX(point.x)
        setNodeContextMenuY(point.y)
        setShowNodeContextMenu(true)
      }

      // 点击关系和条件中的"关系"按钮，添加兄弟节点，（并且---关系+条件）
      if (shape.attrs.genre === RELATION_BUTTON) {
        // 兄弟节点数据
        const borData = {
          ...backstageBasicData,
          ...webNeedFields,
          componetType: 'LOGIN',
          andOrType: 'AND',
          name: '并且',
          id: uuidv4(),
          type: SELECT_BUTTON,
          children: [
            {
              ...relationConBasicData(),
              id: uuidv4(),
            },
          ],
        }

        initdata.children = addBroNode(initdata.children, id, borData)
        reRender()
      }

      // 点击了"条件"按钮,添加 显示searchItem
      if (shape.attrs.genre === CONDITION_BUTTON || shape.attrs.genre === CONDITION_BUTTON_ONLY) {
        graph.setMode('readonly')
        setSearchItemX(point.x)
        setSearchItemY(point.y)
        setSearchItemId(id)
        setSearchItemType('condition')
        setShowSearchItem(true)
      }


      // 点击“表单节点”，显示查询条件item
      if (shape.attrs.genre === SEARCH_NODE && shape.cfg.name !== 'closeBtn') {
        const parentData = graph.findDataById(id)
        graph.setMode('readonly')
        setSearchItemData(parentData)
        setSearchItemId(id)
        setSearchItemX(point.x)
        setSearchItemY(point.y)
        setSearchItemType('search')
        setShowSearchItem(true)
      }

      // 点击“排除”按钮操作
      if (shape.attrs.genre === REMOVE_BUTTON) {
        const parentData = graph.findDataById(id)
        // 如果排除后面有“条件按钮”，则不进行添加
        if (Array.isArray(parentData.children) && parentData.children.length === 0) {
          const removeButtonData = {
            ...conditionButtonOnlyBasicData(),
            id: uuidv4(),
          }
          initdata.children = addChildNode(initdata.children, id, removeButtonData)
          // parentData.children.push({
          //   ...conditionButtonOnlyBasicData(),
          //   id: uuidv4(),
          // })
          reRender()
        }
      }

      // 点击了叉号
      if (shape.cfg.name === 'closeBtn') {
        graph.removeChild(id)
        graph.moveTo(0, 0)
      }
    })


    // 鼠标滑入事件
    graph.on('node:mouseenter', evt => {
      if (evt.target.attrs.genre === SEARCH_NODE) { // 查询条件
        const { item } = evt
        const model = item.getModel()
        const { x, y, name } = model
        graph.updateItem(item, {
          labelCfg: {
            style: {
              fill: '#003a8c',
            },
          },
        });
        const point = graph.getCanvasByPoint(x, y)
        setTooltipTitle(name)
        setNodeToolTipX(point.x)
        setNodeToolTipY(point.y)
        setShowNodeTooltip(true)
      }
    })


    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    // 该方法必须在 render 之前调用，否则不起作用
    graph.on('node:mouseleave', () => {
      setShowNodeContextMenu(false)
      setShowNodeTooltip(false)
    })
  }, [])

  // 防抖改变画布宽度
  const { run: grapChangeSize } = useDebounceFn(() => {
    const { width } = state
    if (graphRef.current && width) {
      graphRef.current.changeSize(width, getClientHeight())
    }
  }, 500)


  useEffect(() => {
    window.addEventListener('resize', () => {
      grapChangeSize()
    })
    return () => {
      window.removeEventListener('resize', () => { })
    }
  })


  // 点击searchItem的保存按钮
  const searchItemSave = useCallback(() => {
    form.validateFields((err, values) => {
      if (!err) {
        const graph = graphRef.current
        if (searchItemType === 'search') { // （修改） 点击"表单节点"出来的searchItem
          initdata.children = changeSearchItemData(initdata.children, searchItemId, values)
          reRender();
          graph.refreshItem(searchItemId); // 此处代码是为了处理changeData后，该表单节点刷新的bug
        }

        if (searchItemType === 'condition') { // （新增) 点击“+条件”节点出来的searchItem
          const borData = getConditionData(values)
          const newChildren = addBroNode(initdata.children, searchItemId, borData)
          initdata.children = newChildren
          reRender();
        }

        // 保存成功后，设置可mode可拖拽，清除SearchItem的id和type和编辑的数据
        setShowSearchItem(false)
        setSearchItemId()
        setSearchItemType()
        setSearchItemData()
        graph.setMode('default')
      }
    })
  }, [searchItemId, searchItemType])

  // 表单的取消按钮
  const cancelSave = () => {
    graphRef.current.setMode('default')
    setShowSearchItem(false)
    setSearchItemData()
  }


  // 下拉选择的change
  const selectChange = useCallback((itemValue, itemName) => {
    const graph = graphRef.current
    const curentEle = graph.findById(nodeContextId)

    const curModel = {
      ...curentEle._cfg.model,
      name: itemName,
      andOrType: itemValue,
    }
    graph.updateItem(curentEle, curModel)
    setShowNodeContextMenu(false)
    reRender()
  }, [nodeContextId])


  // 获取条件树的数据
  const getTreeData = () => {
    if (graphRef.current) {
      const treeData = graphRef.current.save()
      console.log('getTreeData -> treeData', treeData)
    }
  }

  return (
    <div id="treeWarp" style={{ width: '100%', flex: 1 }}>
      <div ref={chartsRef} style={{ position: 'relative', userSelect: 'none' }}>
        {showNodeContextMenu && <NodeContextMenu x={nodeContextMenuX} y={nodeContextMenuY} onChange={selectChange} />}
        {showNodeTooltip && <NodeTooltip x={nodeTooltipX} y={nodeTooltipY} tooltipTitle={tooltipTitle} />}
        {showSearchItem && (
          <SearchItem
            x={searchItemX}
            y={searchItemY}
            searchData={searchData}
            onSave={searchItemSave}
            onCancel={cancelSave}
            data={searchItemData}
            form={form}
          />
        )}
      </div>
      <div style={{ height: 40, textAlign: 'right' }}>
        <Button onClick={() => { getTreeData() }}>保存(控制台打印)</Button>
      </div>
    </div>
  )
}


export default Form.create()(SearchTree)
