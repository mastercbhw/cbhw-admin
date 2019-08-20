import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import styles from './login.less';

@Form.create()
class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginBox}>
        <Form className={styles.loginFormBox}>
          <div className={styles.loginTitle}>
            <div>Hey!</div>
            <div>Wellcome back</div>
          </div>
          <Form.Item className={styles.formItem} colon={false} required={false} label="账号">
            {getFieldDecorator('username1', {
              rules: [{ required: true, message: '请输入账号' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder=""
              />,
            )}
          </Form.Item>
          <Form.Item className={styles.formItem} colon={false} required={false} label="密码">
            {getFieldDecorator('password1', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder=""
              />,
            )}
          </Form.Item>
          <div className={styles.registered}>
            <span>注册</span>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}


export default LoginForm
