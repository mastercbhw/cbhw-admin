import React, { Component } from 'react';
import { connect } from 'dva'
import { Layout } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import CascsdeMultiSelect from '@/components/CascsdeMultiSelect/CascsdeMultiSelect'
import styles from './CheckboxTree.less'

const { Content } = Layout

@connect(({ loading, demo }) => ({
  loading: loading.effects['demo/fetchTree'],
  tree: demo.tree,
}))
class CheckboxTree extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'demo/fetchTree',
    })
  }

  render() {
    const { loading, tree } = this.props
    return (
      <PageHeaderWrapper
        content="一个三层checkbox的联动"
      >
        <Content className={styles.content}>
          <CascsdeMultiSelect loading={loading} options={tree} />
        </Content>
      </PageHeaderWrapper>
    );
  }
}

export default CheckboxTree;
