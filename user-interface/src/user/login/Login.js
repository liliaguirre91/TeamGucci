import React from 'react';
import {Form, Input, Button, Icon, notification } from 'antd';
import { ACCESS_TOKEN } from '../../constants';
import { login } from '../../util/APIFunctions';
import './Login.css';
const FormItem= Form.Item;

class Login extends React.Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title" align="center">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
    
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign( {}, values );
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    })
                    .catch(error => {
                        if (error.status === 401) {
                            notification.error({
                                message: 'LCHS Band Fundraising',
                                description: 'Your Username or Password is incorrect. Please try again!'
                            });
                        } 
                        else {
                            notification.error({
                                message: 'LCHS Band Fundraising',
                                description: error.message || 'Sorry! Something went wrong. Please try again!'
                            });
                        }
                    });
            }
        });
        
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} align="center" className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                    <Input
                        className="input"
                        prefix={<Icon type="user" />}
                        size="large"
                        name="email" 
                        placeholder="Email" />    
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                    <Input
                        className="input"
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                    )}
                </FormItem>
                <FormItem>
                        <Button
                        style={{ borderColor:"#597ef7"}}
                        htmlType="submit" size="large" className="login-form-button">Login</Button>
                </FormItem>
            </Form>
        );
    }
}


export default Login;
