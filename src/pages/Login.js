import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../store/action'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { CommonApi} from '../api/common'
import md5 from "js-md5";
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = Object.assign({}, values, { password: md5(values.password) })
                CommonApi.login(data).then(res=>{
                    this.$showToast.success('登录成功')
                    this.props.setUser(res.message)
                    this.props.history.push('/DXA/overview')
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login_wrap'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}
Login = Form.create({})(Login)
export default connect(mapStateToProps,mapDispatchToProps)(Login);