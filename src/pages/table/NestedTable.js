import React, { useState } from 'react';
import { Table, Modal, Layout, Form, Input, Row, Col, Button, InputNumber, Select, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './Simple.less'

const { Content } = Layout
const { Option } = Select

const { TextArea } = Input;

function NestedTable({
  form: {
    getFieldDecorator,
    getFieldValue,
    setFieldsValue,
  },
}) {
  const [visible, setVisible] = useState(true)
  const [level, setLevel] = useState(1)


  const showModal = async (currentLevel, currentRecord) => {
    setLevel(currentLevel)
    await setVisible(true)
    if (currentRecord) {
      await setFieldsValue({
        searchCode: currentRecord.searchCode,
        searchName: currentRecord.searchName,
        parentCode: currentRecord.parentCode,
        valType: currentRecord.valType,
        valArray: currentRecord.valArray,
        searchSQL: currentRecord.searchSQL,
        exportSQL: currentRecord.exportSQL,
        // itemSort: currentRecord.itemSort,
      })
    }
  }

  const modalHandleOk = () => {
    setVisible(false)
  }

  const modalHandleCancel = () => {
    setVisible(false)
  }

  const confirm = record => {
    console.log('TCL: confirm -> record', record)
  }


  /**
   * 获取table的cloumn
   * @param {boolean} isLast  是否为最后一级，
   * @param {number}} currentLevel 当前table中数据的属于哪一个层级
   */
  function columns(isLast, currentLevel) {
    return [
      {
        title: '编码',
        dataIndex: 'searchCode',
      },
      {
        title: '编码对应中文',
        dataIndex: 'searchName',
      },
      {
        title: '父级编码',
        dataIndex: 'parentCode',
      },
      {
        title: '所属类型',
        dataIndex: 'valType',
        // 0：不可输入，1：输入框，2：时间输入框，3：下拉，4：下拉且能输入
      },
      {
        title: '下拉选择值域',
        dataIndex: 'valArray',
      },
      {
        title: '查询sql',
        dataIndex: 'searchSQL',
      },
      {
        title: '导出sql',
        dataIndex: 'exportSQL',
      },
      {
        title: '所属层级',
        dataIndex: 'Level',
      },
      {
        title: '排序',
        dataIndex: 'itemSort',
      },
      {
        title: '操作',
        key: 'action',
        width: isLast ? 150 : 238,
        render: (text, record) => (
          <span>
            <Button size="small" style={{ marginRight: 10 }} onClick={() => { showModal(currentLevel, record) }} >修改</Button>
            {!isLast ? <Button size="small" type="primary" style={{ marginRight: 10 }} onClick={() => { showModal(currentLevel, null) }}>增加子节点</Button> : null}
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="danger" >删除</Button>
            </Popconfirm>
          </span>
        ),
      },
    ];
  }

  const data = [
    {
      key: '1',
      searchCode: 'searchCode',
      searchName: 'searchName',
      parentCode: 'parentCode',
      valType: 'valType',
      valArray: 'valArray',
      searchSQL: 'searchSQL',
      exportSQL: 'exportSQL',
      Level: 'Level',
      itemSort: 'itemSort',
    },
    {
      key: '2',
      searchCode: 'searchCode',
      searchName: 'searchName',
      parentCode: 'parentCode',
      valType: 'valType',
      valArray: 'valArray',
      searchSQL: 'searchSQL',
      exportSQL: 'exportSQL',
      Level: 'Level',
      itemSort: 'itemSort',
    },
  ]


  const expandedRowRenderLast = (record, index, indent, expanded) => {
    const childData = [];
    for (let i = 0; i < 3; i += 1) {
      childData.push({
        key: i,
        searchCode: 'searchCode',
        searchName: 'searchName',
        parentCode: 'parentCode',
        valType: 'valType',
        valArray: 'valArray',
        searchSQL: 'searchSQL',
        exportSQL: 'exportSQL',
        Level: 'Level',
        itemSort: 'itemSort',
      });
    }
    return <Table columns={columns(true, 3)} dataSource={data} pagination={false} />;
  }


  const expandedRowRender = (record, index, indent, expanded) => {
    console.log('TCL: expandedRowRender -> expanded', expanded)
    console.log('TCL: expandedRowRender -> indent', indent)
    console.log('TCL: expandedRowRender -> index', index)
    console.log('TCL: expandedRowRender -> record', record)
    const childData = [];
    for (let i = 0; i < 3; i += 1) {
      childData.push({
        key: i,
        searchCode: 'searchCode',
        searchName: 'searchName',
        parentCode: 'parentCode',
        valType: 'valType',
        valArray: 'valArray',
        searchSQL: 'searchSQL',
        exportSQL: 'exportSQL',
        Level: 'Level',
        itemSort: 'itemSort',
      });
    }
    return (
      <Table
        columns={columns(false, 2)}
        dataSource={data}
        pagination={false}
        expandedRowRender={expandedRowRenderLast}
      />
    )
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 12 },
    },
  };

  const isSelect = getFieldValue('valType') === 3 || getFieldValue('valType') === 4

  return (
    <PageHeaderWrapper
      title="这就是简单的table，好吧，再给你加一个查询条件"
      content={
        <>
          <div key={1}>嵌套表单</div>
          <div key={2}>目的在于实现项目中级联菜单的修改</div>
        </>
      }
    >
      <Content className={styles.simpleContent}>
        <Row align="middle" style={{ marginBottom: 20 }}>
          <Col align="right"><Button type="primary" onClick={() => showModal(1, null)}>新增</Button></Col>
        </Row>
        <Table
          columns={columns(false, 1)}
          rowKey={record => record.key}
          expandedRowRender={expandedRowRender}
          dataSource={data}
          pagination={false}
        />
      </Content>
      <Modal
        title="新增表单"
        visible={visible}
        width="50vw"
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}
        destroyOnClose
      >
        <Form {...formItemLayout}>
          <Form.Item label="当前层级">
            {getFieldDecorator('level', {
              initialValue: level,
              rules: [{ required: true, message: '请填写层级(level)' }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                placeholder="层级(level)"
                disabled
              />,
            )}
          </Form.Item>
          <Form.Item label="编码">
            {getFieldDecorator('searchCode', {
              rules: [{ required: true, message: '请填写编码(searchCode)' }],
            })(
              <Input
                placeholder="编码(searchCode)"
              />,
            )}
          </Form.Item>
          <Form.Item label="编码对应中文">
            {getFieldDecorator('searchName', {
              rules: [{ required: true, message: '请填写编码对应中文(searchName)' }],
            })(
              <Input
                placeholder="编码对应中文(searchName)"
              />,
            )}
          </Form.Item>
          <Form.Item label="parentCode">
            {getFieldDecorator('parentCode', {
              rules: [{ required: (level && level !== 1), message: '请填写父级的searchCode(parentCode)' }],
            })(
              <Input
                placeholder=""
                disabled
              />,
            )}
          </Form.Item>
          <Form.Item label="数据类型">
            {getFieldDecorator('valType', {
              initialValue: 1,
              rules: [{ required: true, message: '数据类型(1：输入框，2：时间输入框，3：下拉，4：下拉且能输入)' }],
            })(
              <Select>
                <Option value={1}>输入框</Option>
                <Option value={2}>时间输入框</Option>
                <Option value={3}>下拉选择</Option>
                <Option value={4}>下拉选择且能输入</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="下拉所有值">
            {getFieldDecorator('valArray', {
              rules: [{ required: isSelect, message: 'valArray' }],
            })(
              <Input
                placeholder=""
                disabled={!isSelect}
              />,
            )}
          </Form.Item>

          <Form.Item label="searchSQL">
            {getFieldDecorator('searchSQL', {
            })(
              <TextArea
                placeholder=""
                autoSize={{ minRows: 4, maxRows: 5 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="exportSQL">
            {getFieldDecorator('exportSQL', {
            })(
              <TextArea
                placeholder=""
                autoSize={{ minRows: 4, maxRows: 5 }}
              />,
            )}
          </Form.Item>
          {/* <Form.Item label="itemSort">
            {getFieldDecorator('itemSort', {
              rules: [{ required: true, message: 'itemSort' }],
            })(
              <Input
                placeholder="itemSort"
              />,
            )}
          </Form.Item> */}
        </Form>
      </Modal>
    </PageHeaderWrapper >
  )
}


export default Form.create()(NestedTable);
