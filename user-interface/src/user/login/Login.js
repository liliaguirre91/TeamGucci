import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Button, Icon, notification } from 'antd';
import { ACCESS_TOKEN } from '../../constants';
import { login } from '../../util/APIFunctions';
const FormItem= Form.Item;

class Login extends React.Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
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
                    notification.success({
                        message: 'LCHS Band Fundraising',
                        description: "Congratulations you've been logged in!"
                    });
                    //this.props.onLogin();
                }).catch(error => {
                    if (error.status === 401) {
                        notification.error({
                            message: 'LCHS Band Fundraising',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });
                    } else {
                        notification.error({
                            message: 'LCHS Band Fundraising',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
            }
        });
        
        //alert("Your have been logged in! You will be redirected to the Home page");
        //this.props.history.push( "/");
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                    <Input
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
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                    )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    </FormItem>
                </Form>
        );
    }
}


    
    /*constructor(props) {
        super(props);
        this.state = {
                    name:     { value : '' },
                    email:    { value : '' },
                    password: { value : '' },
                    id:       { value : '' }
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
  
  handleInputChange(event) {
      const target = event.target;
      const inputName = target.name;
      const inputValue = target.value;
      
      this.setState ({
         [inputName] : {
            value: inputValue,
         }
      });
   }
   
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleAddressChange(event) {
  	this.setState({address: event.target.value});
  }

    handleSubmit(event) {
    
        event.preventDefault();
        //const { name } = this.state;
        //const { email } = this.state;
        //const { address } = this.state;
        //alert('A name and email were submitted: ' + name + ' ' + email);

        this.props.history.push( "/");
    }

  render() {
    return (
      <Form align="center" onSubmit={this.handleSubmit}> 
         <h1> Login </h1>
         <FormItem
            label="Email">
            <Input 
                size="large"
                name="email"
                type="email" 
                autoComplete="off"
                placeholder="Your email"
                value={this.state.email.value} 
                onChange={this.handleInputChange} />
        </FormItem>
        <FormItem
            label="Password"> 
            <Input 
                size="large"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="Password"
                value={this.state.password.value} 
                onChange={this.handleInputChange}
                maxLength="15" />
         </FormItem>
         <FormItem>
            <Button type="primary"
               htmlType="submit"
               size="large"
               className="signup-form-button">Sign Up</Button>
         </FormItem>
      </Form>
    );
  }*/

/*ReactDOM.render(
  <Login />,
  document.getElementById('root')
);*/

export default Login;
