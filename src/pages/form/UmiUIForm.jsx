import React, { Component } from 'react';
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Layout, Button, Form, Input, InputNumber, Select, Cascader } from 'antd'
import JsonForm from '@/components/JsonForm/SimpleForm'
import styles from './ConfigForm.less'

const { Content } = Layout


@Form.create()
@connect(({ configForm }) => ({
  formJson: configForm.formJson,
}))
class UmiUIForm extends Component {
  render() {
    const { form } = this.props
    return (
      <PageHeaderWrapper
        title="可配置话表单"
        content="根据umi-ui中的configForm,修改为项目中"
      >
        <Content className={styles.simpleContent}>
          得到的
        </Content>
      </PageHeaderWrapper>
    );
  }
}

export default UmiUIForm;
