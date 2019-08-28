import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva'
import router from 'umi/router'
import styles from './style.less';

@connect()
@Form.create()
class LoginForm extends React.PureComponent {
  loginHandle = e => {
    e.preventDefault();
    const { form: { validateFields }, dispatch } = this.props
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'user/login',
          payload: {
            params: values,
          },
        })
        console.log('Received values of form: ', values);
      }
    });
    router.push('/')
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginWarp}>
        <div className={styles.loginBox}>
          <Form className={styles.loginFormBox}>
            <div className={styles.loginTitle}>
              <div>Hey!</div>
              <div>Wellcome back</div>
            </div>
            <Form.Item className={styles.formItem} colon={false} required={false} label="账号">
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入账号' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder=""
                />,
              )}
            </Form.Item>
            <Form.Item className={styles.formItem} colon={false} required={false} label="密码">
              {getFieldDecorator('password', {
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
              admin/123456
          </div>
            <Form.Item>
              <Button type="primary" onClick={this.loginHandle} style={{ width: '100%' }}>
                Login
            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}


export default LoginForm
