import React, { Component } from 'react';
import { findUser, setPassword } from '../../../util/APIFunctions';
//import './OrderLookup.css';
import './ResetPassword.css';
import { Form, Input, Button, message, Table, notification } from 'antd'
const FormItem= Form.Item;

const items = [];
class ResetPassword extends Component {
   constructor(props) {
      super(props);
      this.state = { 
         email: '',
         password: '',
         customer: '',
         submitted: false
      };
      this.handleEmailChange = this.handleEmailChange.bind(this); 
      this.handlePasswordChange = this.handlePasswordChange.bind(this);   
      this.handleSubmit = this.handleSubmit.bind(this);
      this.findEmail = this.findEmail.bind( this );
      this.setPass = this.setPass.bind( this );
   //this.loadUser = this.saveUser.bind(this);
  }

   handleEmailChange(event) {
      this.setState( {  email: event.target.value} );
   }

   handlePasswordChange(event) {
      this.setState( {  password: event.target.value} );
   }

   async findEmail( event ) {
      await findUser( this.state.email )
      .then( response => {
         this.setState( { customer: response } )
      } )
      .catch(error => {
         notification.error({
             message: 'LCHS Band Fundraising',
             description:error.message || 'Sorry! Something went wrong!'
         });
     });
     console.log( this.state.customer );
   }

   async setPass( event ){
      await setPassword( this.state.customer.userId, this.state.password )
      .then( response => {
         this.setState( { customer: response } )
      } )
      .catch(error => {
         notification.error({
             message: 'LCHS Band Fundraising',
             description:error.message || 'Sorry! Something went wrong!'
         });
     });
     console.log( this.state.customer );
   }
    
   async handleSubmit(event) {
   }

   handleClick = param => e => {
      e.preventDefault();
      this.props.history.push(param);
   }
   
   render() {
      
      return (
         <div className="order-search-container">
            <h1 className="page-title">Reset Password</h1>
            <h2 align="center"> Enter the customer's email </h2>
                <Form className="search-form" align="center"> 
                    <FormItem
                        label="Customer Email">
                        <Input 
                            size="large"
                            type="text" 
                            autocomplete="off"
                            value={this.state.email}
                            placeholder="Customer Email" 
                            onChange={(event) => this.handleEmailChange( event )} />
                     </FormItem>
                     <FormItem>
                       <Button 
                               htmlType="submit"
                               size="large"
                               className="set-password"
                               onClick={ (event) =>this.findEmail( event) } >Find User</Button>
                    </FormItem>
                         <FormItem
                        label="New Password">
                        <Input 
                            size="large"
                            type="text" 
                            autocomplete="off"
                            value={this.state.password}
                            placeholder="New Password" 
                            onChange={(event) => this.handlePasswordChange( event )} />
                    </FormItem>
                    <FormItem>
                       <Button
                               htmlType="submit"
                               size="large"
                               className="set-password"
                               onClick={ (event) =>this.setPass( event) } >Set Password</Button>
                    </FormItem>
                    <FormItem>
                            <Button type="danger" ghost
                                htmlType="submit"
                                size="large"
                                className="back-button"
                                onClick={ this.handleClick("/admin-account")}> Cancel </Button>
                    </FormItem>
                </Form>
         </div>
      );
   }
}



export default ResetPassword;
