import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import * as userService from '../services/userService'
import {history} from "../utils/history";


class SignUpForm extends React.Component {


    handleSubmit = e => {
        e.preventDefault();
        const callback = (data) => {
            if(data.userType !== -2){
                sessionStorage.setItem('user', JSON.stringify(data));
                console.log(JSON.parse(sessionStorage.getItem('user')).userId);
                history.push("/");
                message.success("sign up successfully");
            }
            else message.error("用户名已存在，请重新输入。")
        };

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.password !== values.password2){
                    message.error("两次密码不同，请重新输入。");
                    return;
                }
                if(!values.email.includes("@")){
                    message.error("邮箱格式不正确，请重新输入。");
                    return;
                }
                let formValue = {
                    username:values.username,
                    password:values.password,
                    name:values.name,
                    tel:values.tel,
                    email:values.email,
                    address:values.address
                };
                console.log('Received values of form: ', values);
                userService.signUp(formValue, callback);
            }
        });
    };

    loginDirect = () => {
        history.push('/login');
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
                    {getFieldDecorator('password2', {
                        rules: [{required: true, message: 'Please make sure your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password reInput"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please input your real name!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Real name"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('tel', {
                        rules: [{required: true, message: 'Please input your tel!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Tel"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your email!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('address', {
                        rules: [{required: true, message: 'Please input your address!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Address"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign up
                    </Button>
                    Or <Button onClick={this.loginDirect}>Login directly</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedSignUpForm = Form.create({name: 'normal_login'})(SignUpForm);

export default WrappedSignUpForm
