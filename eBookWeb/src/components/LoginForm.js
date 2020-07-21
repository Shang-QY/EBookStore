import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import * as userService from '../services/userService'
import {history} from "../utils/history";


class LoginForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        const callback = (data) => {
            console.log(data);
            if(data.userType === -1) message.error("账号密码错误，请重输");
            else if(data.ban === 0){
                sessionStorage.setItem('user', JSON.stringify(data));
                console.log(JSON.parse(sessionStorage.getItem('user')));
                history.push("/");
                message.success("login successfully");
            }
            else{
                message.error("该账号可能存在违规操作，已被封禁");
            }
        };

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                userService.login(values, callback);
            }
        });
    };

    forgetPassword = () => {
        history.push('/signUp');
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a onClick={this.forgetPassword}>register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);

export default WrappedLoginForm
