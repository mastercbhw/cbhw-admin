/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import React from 'react'
import { Checkbox, Spin } from 'antd'
import classNames from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import styles from './CascsdeMultiSelect.less'

const CheckItems = ({
  onClick,
  onChange,
  label,
  checked,
  active = false,
  indeterminate,
  checkedNum,
}) => (
  <div className={classNames(styles['checkd-items-cl'], { [styles.active]: active })}>
    <Checkbox className={styles['checkbox-self-cl']} onChange={onChange} checked={checked} indeterminate={indeterminate} />
    <div className={styles['checkd-label-cl']} onClick={onClick}>
      {label}
    </div>
    <div className={styles['checkd-num-cl']}>
      {checkedNum}
    </div>
  </div>
)


export default class CascsdeMultiSelect extends React.Component {
    /**
   * 设置children选中/取消状态
   * @param childrenList 子集
   * @param checked 设置的状态
   */
  static setChildrenChecked(
    dataList,
    checked,
  ) {
    const childrenList = cloneDeep(dataList)
    if (childrenList && childrenList.length) {
      for (let i = 0; i < childrenList.length; i += 1) {
        const item = childrenList[i]
        item.checked = checked
        item.indeterminate = false
        if (item.childNodes) {
          item.childNodes = this.setChildrenChecked(
            item.childNodes,
            checked,
          )
        }
      }
    }
    return childrenList
  }


  /**
   * 设置父亲节点的选中/半选中状态
   * @param item 当前节点
   * @param checked 设置状态
   */
  static setFatherCheckState(item, checked, dataList, keyCouldDuplicated) {
    const treeNodeObj =
      CascsdeMultiSelect.getTreeNodeData(dataList, item.id, null, keyCouldDuplicated)
    const { parentNode } = treeNodeObj
    if (parentNode) {
      const halfChecked = CascsdeMultiSelect.getBotherCheckedState(parentNode.childNodes, !checked)
      if (halfChecked) {
        parentNode.checked = !halfChecked
        parentNode.indeterminate = halfChecked
      } else {
        parentNode.checked = checked
        parentNode.indeterminate = false
      }
      CascsdeMultiSelect.setFatherCheckState(parentNode, checked, dataList, keyCouldDuplicated)
    }
  }

   /**
   * 根据传入的 key 获取其节点，父节点
   * @param dataList 组件的 options
   * @param key 要查询的 item.$id 也有可能是 $item.value
   * @param parentNode 父节点（方法自用）
   */
  static getTreeNodeData(dataList, key, parentNode = null, keyCouldDuplicated) {
    let back = null
    if (!key) { return null }
    if (dataList && dataList.length) {
      for (let i = 0, len = dataList.length; i < len; i += 1) {
        if (dataList[i].id === key) {
          return {
            parentNode,
            itemNode: dataList[i],
          }
        }
        if (dataList[i].childNodes) {
          const item =
          CascsdeMultiSelect.getTreeNodeData(
              dataList[i].childNodes, key, dataList[i], keyCouldDuplicated,
            )
          back = item || back
        }
      }
    }
    return back
  }


  /**
   * 获取兄弟节点指定选中状态
   * @param botherList 兄弟节点列表
   * @param state 查询的选中状态
   * @return 兄弟节点中包含对应状态结果 boolean
   */
  static getBotherCheckedState(botherList, state) {
    let handleCheckedState = false
    if (botherList && botherList.length) {
      for (let i = 0, len = botherList.length; i < len; i += 1) {
        // 查询是否存在选中
        if (state) {
          if (botherList[i].checked || botherList[i].indeterminate) {
            handleCheckedState = true
            break
          }
        } else if (
             // 查询是否存在未选中
          // 要么未选中，要么半选中状态
            (!botherList[i].checked && !botherList[i].indeterminate) ||
            (!botherList[i].checked && botherList[i].indeterminate)
          ) {
            handleCheckedState = true
            break
        }
      }
    }
    return handleCheckedState
  }


  constructor(props) {
    super(props)
    this.state = {
      options: [], // 基础数据
      loading: false,
      allChecked: false,
      AllIndeterminate: false, // 全选checkbox中间状态
      secondIndex: 0,
      thirdIndex: 0,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.loading !== state.loading ||
      JSON.stringify(props.options) !== JSON.stringify(state.options)
    ) {
      return {
        ...state,
        options: props.options, // 基础数据
        loading: props.loading,
      }
    }

    return null
  }

  componentDidMount() {
    console.log(1)
  }

  // 选项列表点击事件
  onItemsClick = (state, item, index) => {
    this.setState({
      [state]: index,
    })
    if (state === 'secondIndex') {
      this.setState({
        thirdIndex: 0,
      })
    }
  }

 /**
   * 选中/取消选项事件
   */
  onItemChecked = (event, item, state, index) => {
    const { checked } = event.target

    const { isCleanDisabledLabel, keyCouldDuplicated } = this.props
    const { options } = this.state
    const treeNodeObj = CascsdeMultiSelect.getTreeNodeData(
      options,
      item.id,
      null,
      keyCouldDuplicated,
    )

    const { itemNode } = treeNodeObj
    itemNode.checked = checked
    itemNode.indeterminate = false
    this.itemDisabledNodes = []
    // 设置子集全部选中
    if (itemNode.childNodes) {
      itemNode.childNodes = CascsdeMultiSelect.setChildrenChecked(
        itemNode.childNodes,
        itemNode.checked,
        isCleanDisabledLabel,
        this.itemDisabledNodes,
      )
    }
    if (!isCleanDisabledLabel && this.itemDisabledNodes.length > 0) {
      itemNode.checked = false
      itemNode.indeterminate = true
      let itemDisabledNode = this.itemDisabledNodes.pop()
      while (itemDisabledNode) {
        CascsdeMultiSelect.setFatherCheckState(
          itemDisabledNode, itemDisabledNode.checked, options, keyCouldDuplicated,
        )
        itemDisabledNode = this.itemDisabledNodes.pop()
      }
    } else if (item.level > 1) {
      // 设置父级选中状态
      CascsdeMultiSelect.setFatherCheckState(
        itemNode,
        itemNode.checked,
        options,
        keyCouldDuplicated,
      )
    }
    this.setState({
      options,
      AllIndeterminate: !!options.filter(_ => _.checked).length &&
        options.filter(_ => _.checked).length < options.length,
      allChecked: options.filter(_ => _.checked).length === options.length,
    })
    if (state) {
      this.setState({
        [state]: index,
      })
      if (state === 'secondIndex') {
        this.setState({
          thirdIndex: 0,
        })
      }
    }
  }

  /**
   * 导出树形结构数据处理
   */
  exportTreeHandle = (arr, checked = false, deleteCode = []) => {
    if (arr.length) {
      // for (const i in arr) {
      //   if (deleteCode.includes(arr[i].searchCode)) {
      //     arr.splice(i, 1)
      //   } else {
      //     arr[i].checked = checked
      //     arr[i].active = false // 是否为选中状态
      //     arr[i].indeterminate = false // 设置 indeterminate 状态，只负责样式控制
      //     if (arr[i].childNodes && arr[i].childNodes.length) {
      //       this.exportTreeHandle(arr[i].childNodes, checked, deleteCode)
      //     }
      //   }
      // }
      arr.forEach((item, index) => {
        if (deleteCode.includes(item.searchCode)) {
          arr.splice(index, 1)
        } else {
          item.checked = checked
          item.active = false // 是否为选中状态
          item.indeterminate = false // 设置 indeterminate 状态，只负责样式控制
          if (item.childNodes && item.childNodes.length) {
            this.exportTreeHandle(item.childNodes, checked, deleteCode)
          }
        }
      })
    }
    return arr
  }

  // 全选按钮
  allCheckedChange = event => {
    const { checked } = event.target
    const { options } = this.state
    const newOptions = this.exportTreeHandle(options, checked)
    this.setState({
      allChecked: checked,
      options: newOptions,
      AllIndeterminate: false,
    })
  }


  render() {
    const { loading, allChecked, options, AllIndeterminate, secondIndex, thirdIndex } = this.state
    const secondOptions = (
      options.length &&
      options[secondIndex].childNodes
    ) ? options[secondIndex].childNodes : []
    const thirdOptions = (
      options.length &&
      options[secondIndex].childNodes &&
      options[secondIndex].childNodes[thirdIndex]
    ) ? options[secondIndex].childNodes[thirdIndex].childNodes : []
    return (
      <Spin spinning={loading}>
        <div className={styles['export-selectd-cl']}>
          <div className={styles.selectWarp}>
            <div className={styles.allSelectedBox}>
              <Checkbox
                checked={allChecked}
                indeterminate={AllIndeterminate}
                onChange={this.allCheckedChange}
              >
                全选
              </Checkbox>
                {/* <span className={styles.showSelected}>
                  仅显示已选
                </span> */}
            </div>
            {
              options.map((item, index) => (
                <CheckItems
                  key={item.searchCode}
                  label={item.searchName}
                  indeterminate={item.indeterminate}
                  checked={item.checked}
                  active={item.active}
                  checkedNum=""
                  onClick={() => this.onItemsClick('secondIndex', item, index)}
                  onChange={event => this.onItemChecked(event, item, 'secondIndex', index)}
                />
              ))
            }
          </div>
          <div className={styles.selectWarp}>
            {
              secondOptions.map((item, index) => (
                <CheckItems
                  key={item.searchCode}
                  label={item.searchName}
                  indeterminate={item.indeterminate}
                  value={item}
                  checked={item.checked}
                  checkedNum=""
                  onClick={() => this.onItemsClick('thirdIndex', item, index)}
                  onChange={event => this.onItemChecked(event, item, 'thirdIndex', index)}

                />
              ))
            }
          </div>
          <div className={styles.selectWarp}>
            {
              thirdOptions.map((item, index) => (
                <CheckItems
                  key={item.searchCode}
                  indeterminate={item.indeterminate}
                  label={item.searchName}
                  value={item}
                  checked={item.checked}
                  checkedNum=""
                  onChange={event => this.onItemChecked(event, item, '', index)}
                />
              ))
            }
          </div>
        </div>
      </Spin>
    )
  }
}
