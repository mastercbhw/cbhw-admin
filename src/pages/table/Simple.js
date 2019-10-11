import React from 'react';
import { Table, Tag, Divider, Layout, Form, Input, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './Simple.less'

const { Content } = Layout

function SimpleTable({
  form: {
    getFieldDecorator,
  },
}) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]
  return (
    <PageHeaderWrapper
      title="这就是简单的table，好吧，再给你加一个查询条件"
      content={
        <>
          <div key={1}>列表是没啥写的。就是排序筛选，分页，antd的组件都封装的很不错了。</div>
          <div key={2}>但是产品具有一票否定权。</div>
          <div key={3}>程序员都是弟弟。。。</div>
        </>
      }
    >
      <Content className={styles.simpleContent}>
        <Form layout="inline">
          <Form.Item>
            {getFieldDecorator('hohohoho', {
              rules: [{ required: true, message: '若无闲事挂心头' }],
            })(
              <Input
                placeholder="若无闲事挂心头"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '便是人间好时节' }],
            })(
              <Input
                type="sasasa"
                placeholder="便是人间好时节"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              我是一个没啥用的按钮
          </Button>
          </Form.Item>
        </Form>
        <Table
          title={() => '列表花样多得很，最好的那个列表永远是产品脑子里的那一个'}
          columns={columns}
          dataSource={data}
          rowKey={record => record.key}
        />
      </Content>
    </PageHeaderWrapper>
  )
}


export default Form.create()(SimpleTable);
