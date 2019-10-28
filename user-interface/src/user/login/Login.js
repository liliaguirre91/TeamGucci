import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Button, notification } from 'antd';
const FormItem= Form.Item;

class Login extends React.Component {
    constructor(props) {
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
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('root')
);

export default Login;
