/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: October 21, 2019
 * Description: The Login class component is used by customers to log into their account. It takes the customers
 * email address and password and sends them to the API. If they are correct the API responds with an Access Token
 * The main handlers/functions in this component are:
 *      - handleSubmit
 *---------------------------------------------------------------------------------------------------------------------*/
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
        );//end return
    }//end render
}//end Login

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }//end constructor
    
    /*******************************************************************************************
     * Handler: handleSubmit() - This handler takes care of sending the login information to the api 
     * Parameters: default submit event
     * Preconditions: All fields in the login form must be filled out
     * Postcondition: A user will be logged in, an access token for the user will be stored in localStorage
     ********************************************************************************************/
    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign( {}, values );
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    })//end then
                    .catch(error => {
                        if (error.status === 401) {
                            notification.error({
                                message: 'LCHS Band Fundraising',
                                description: 'Your Username or Password is incorrect. Please try again!'
                            });//end notification
                        }//end if
                        else {
                            notification.error({
                                message: 'LCHS Band Fundraising',
                                description: error.message || 'Sorry! Something went wrong. Please try again!'
                            });//end notification
                        }//end else
                    });//end catch
            }//end if
        });//end validateFields
    }//end handleSubmit
    
    /*---------------------------------------------------------------------------------------------------------------------
    * Function: render takes care of rendering all component elements to the screen. 
    * Then the return includes all JSX/HTML components and their formatting. 
    * In this portion we define the form that will be used in the page. 
    *---------------------------------------------------------------------------------------------------------------------*/ 
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
        );//end return
    }//end render
}//end LoginForm

export default Login;