// MyForm.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const FormItem = Form.Item
// 默认的layout
export const defaultLabelColSpan = 6
const defaultFormItemLayout = {
  labelCol: { span: defaultLabelColSpan },
  wrapperCol: { span: 14 },
}

// 渲染单个表单项
const renderFormItem = ({ item, layout, getFieldDecorator }) => {
  const { label, key, required, component, options = {}, rules } = item
  return (
    <FormItem key={key} label={label} {...layout}>
      {getFieldDecorator(key, {
        ...options,
        rules: rules || [{ required, message: `${label}为空` }],
      })(component || <Input />)}
    </FormItem>
  )
}

class JsonForm extends PureComponent {
  render() {
    // items格式即为上文配置的表单项
    const { items, layout, form: { getFieldDecorator } } = this.props
    return (
      <Form>
        {items.map(item => renderFormItem({ item, layout, getFieldDecorator }))}
      </Form>
    )
  }
}

JsonForm.propTypes = {
  items: PropTypes.array.isRequired,
  layout: PropTypes.object,
  form: PropTypes.object.isRequired,
}

JsonForm.defaultProps = {
  layout: defaultFormItemLayout,
}

export default Form.create()(JsonForm)
