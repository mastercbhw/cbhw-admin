import React, { Component } from 'react';
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Layout, Button, Form, Input, InputNumber, Select, Cascader } from 'antd'
import JsonForm from '@/components/JsonForm/SimpleForm'
import styles from './ConfigForm.less'

const { Content } = Layout
const { Option } = Select

const addressData = [
  {
    value: '浙江',
    label: '浙江',
    children: [
      {
        value: '杭州',
        label: '杭州',
        children: [
          {
            value: '西湖',
            label: '西湖',
          },
        ],
      },
    ],
  },
  {
    value: '江苏',
    label: '江苏',
    children: [
      {
        value: '南京',
        label: '南京',
        children: [
          {
            value: '中华门',
            label: '中华门',
          },
        ],
      },
    ],
  },
]


@Form.create()
@connect(({ configForm }) => ({
  formJson: configForm.formJson,
}))
class ConfigForm extends Component {
  getFormJson = () => [
    {
      label: '患者姓名',
      key: 'name',
      component: (<Input />),
      required: true,
      options: {},
    },
    {
      label: '性别',
      key: 'sex',
      component: (
        <Select>
          <Option value="男" key="男">男</Option>
          <Option value="女" key="女">女</Option>
        </Select>
      ),
      required: false,
      options: {
        initialValue: '男',
      },
    },
    {
      label: '年龄',
      key: 'age',
      component: (<InputNumber style={{ width: '100%' }} />),
      required: false,
      options: {
        initialValue: 18,
      },
    },
    {
      label: '籍贯',
      key: 'address',
      component: (<Cascader options={addressData} placeholder="请选择" />),
      required: false,
      options: {
        initialValue: ['浙江', '杭州', '西湖'],
      },
    },
  ]

  save = () => {
    this.props.form.validateFields((value, err) => {
      console.log('TCL: ConfigForm -> save -> err', err)
      console.log('TCL: ConfigForm -> save -> value', value)
    })
  }

  render() {
    const { form } = this.props
    return (
      <PageHeaderWrapper
        title="可配置化表单的demo"
        content="啥系统的表单都不能跟医院系统比，最近写医院的表单要爆炸了，就放个最简单的完事，skr～"
      >
        <Content className={styles.simpleContent}>
          <div>
            <JsonForm form={form} items={ this.getFormJson() || []} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={() => { this.save() }}>保存</Button>
            <Button style={{ marginLeft: 10 }}>取消</Button>
          </div>
        </Content>
      </PageHeaderWrapper>
    );
  }
}


export default ConfigForm;
