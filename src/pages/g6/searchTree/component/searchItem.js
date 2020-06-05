import React from 'react'
import { Form, Select, Input, Button, Cascader } from 'antd'

const { Option } = Select
const FormItem = Form.Item

const compareTypeData = [
  { code: 'EQ', name: '等于' },
  { code: 'GT', name: '大于' },
  { code: 'LT', name: '小于' },
]


const warpStyle = {
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  boxShadow: '5px 5px 5px rgba(0,0,0,.6)',
  padding: 5,
  borderRadius: 2,
}

const SearchItem = ({ x = 0, y = 0, searchData, form, onSave, onCancel, data = {} }) => {
  console.log('SearchItem -> data', data)

  const { getFieldDecorator, setFieldsValue } = form
  return (
    <div style={{ ...warpStyle, left: x, top: y }}>
      <Form>
        <FormItem style={{ display: 'inline-block', marginBottom: 0 }}>
          {getFieldDecorator('webParamId', {
            initialValue: data.webParamId,
            rules: [{ required: true, message: '请选择' }],
            getValueFromEvent: (value, item) => {
              const curItem = item[item.length - 1];
              setFieldsValue({
                webCascaderName: (item || []).map(c => c.searchName).join('/'), // 需要的中文转译字段
                paramName: curItem.esField, // es字段
              })
              return value;
            },
          })(
            <Cascader
              options={searchData}
              size="small"
              style={{ width: 300 }}
              changeOnSelect
              allowClear={false}
              placeholder="全部分类"
              fieldNames={{
                label: 'searchName',
                value: 'id',
                tableCode: 'tableCode',
                children: 'childNodes',
              }}
              showSearch={{ filter: (inputValue, path) => path.some(option => option.searchName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) }}
            />,
          )}
        </FormItem>
        <FormItem style={{ display: 'inline-block', marginBottom: 0, marginLeft: 5 }}>
          {getFieldDecorator('compareType', {
            initialValue: data.compareType,
            rules: [{ required: true, message: '请选择' }],
            getValueFromEvent: (value, item) => {
              setFieldsValue({
                webCompareTypeName: item.props.children, // 需要的中文转译字段
              })
              return value;
            },
          })(
            <Select size="small" style={{ width: 65 }}>
              {compareTypeData.map(c => <Option key={c.code} value={c.code}>{c.name}</Option>)}
            </Select>,
          )}
        </FormItem>
        <FormItem style={{ display: 'inline-block', marginBottom: 0, marginLeft: 5 }}>
          {getFieldDecorator('paramValue', {
            initialValue: data.paramValue,
            rules: [
              { required: true, message: '请输入' },
            ],
          })(
            <Input size="small" style={{ width: 130 }} />,
          )}
        </FormItem>
        <FormItem style={{ display: 'inline-block', marginBottom: 0, marginLeft: 5 }}>
          <Button type="primary" size="small" onClick={() => { onSave() }}>
            保存
          </Button>
          <Button size="small" style={{ marginLeft: 5 }} onClick={() => { onCancel() }}>
            取消
          </Button>
        </FormItem>
        <FormItem style={{ display: 'none' }} label="存储级联菜单的中文">
          {getFieldDecorator('webCascaderName', {
            initialValue: data.webCascaderName,
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem style={{ display: 'none' }} label="存储级联菜单esField">
          {getFieldDecorator('paramName', {
            initialValue: data.paramName,
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem style={{ display: 'none' }} label="存储关系的中文">
          {getFieldDecorator('webCompareTypeName', {
            initialValue: data.webCompareTypeName,
          })(
            <Input />,
          )}
        </FormItem>
      </Form>
    </div>
  )
}

export default Form.create()(SearchItem)
