import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Layout, Button, Form, Input, Icon } from 'antd'
import styles from './ConfigTree.less'

const { Content } = Layout


@Form.create()
class ConfigTree extends Component {
  constructor(props) {
    super(props)
    this.id = 0
  }

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.id += 1);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <Form.Item
        {...formItemLayout}
        label="一级结构"
        required={false}
        style={{ marginBottom: 0 }}
        key={k}
      >
        <Form.Item
          style={{ display: 'inline-block' }}
        >
          {getFieldDecorator(`label[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="中文" style={{ marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item
          style={{ display: 'inline-block' }}
        >
          {getFieldDecorator(`code[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="code" style={{ marginRight: 8 }} />)}
        </Form.Item>
        {keys.length > 1 ? (
          <Icon
            className={styles['dynamic-delete-button']}
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <PageHeaderWrapper>
        <Content className={styles.simpleContent}>
          <Form onSubmit={this.handleSubmit}>
            {formItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> Add field
              </Button>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="primary" htmlType="submit">
                Submit
          </Button>
            </Form.Item>
          </Form>
        </Content>
      </PageHeaderWrapper>
    );
  }
}

export default ConfigTree;
