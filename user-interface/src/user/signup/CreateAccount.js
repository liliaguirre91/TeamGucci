import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { createAccount } from '../../util/APIFunctions';
import './CreateAccount.css';
import {Form, Input, Button, notification } from 'antd';
const FormItem= Form.Item;

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                  name: {
                     value: ''
                  },
                  email: {
                     value: ''
                  },
                  id: {
                     value: ''
                  },
                  errors: {
                     value: []
                  }
   };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  /***********************************************************************************
   * State Handlers: These handlers set the states based on the given events. These
   * will corrspond to the user entries in the delivery form.
   ************************************************************************************/
  
  /*This basically does all handlers at once. Also it validates each input as it's entered.
   * This means that each state needs its own validation function. 
   */
   handleInputChange(event) {
      const target = event.target;
      const inputName = target.name;
      const inputValue = target.value;
      
      this.setState ({
         [inputName] : {
            value: inputValue
         }
      });
   }
  

  /*******************************************************************************************
   * Handler: handleSubmit() - This handler takes care of posting the order delivery
   * information to the API, which will in turn isert the relevan information to the 
   * database. 
   * Parameters: default submit event
   * Preconditions: All fields in the delivery forma must be filled out
   * Postcondition: An order will be created and all relevant order information will be inserted
   * into the database.
   ********************************************************************************************/
   handleSubmit(event) {
      event.preventDefault();
      const name  = this.state.name.value;
      const email = this.state.email.value;

      
      //Create a constant containing all the information necessary to create a user account in database
      const signupRequest = {
         name: name,
         email: email,
         levels: 2,
         comments: "Comments"
      };
      
      //Call the createAccount function to insert user into database
      createAccount(signupRequest)
      .then(response => {
         notification.success({
            message: 'LCHS Band Fundraising',
            description: "Congratulations! You have succefully created an account. Please Login to continue!",
         });
         this.props.history.push("/login");
      }).catch(error => {
         notification.error({
            message: 'LCHS Band Fundraising',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
         });
      });
   }

  render() {
    return (
       <Form align="center" onSubmit={this.handleSubmit} className="signup-form">
         <FormItem
            label="Full Name">
            <Input
               size="large"
               name="name"
               autoComplete="off"
               placeholder="Your full name"
               value={this.state.name.value}
               onChange={(event) => this.handleInputChange(event)}/>
         </FormItem>
         <FormItem
            label="Email">
            <Input
               size="large"
               name="email"
               type="email"
               autoComplete="off"
               placeholder="Your email"
               value={this.state.email.value}
               onChange={(event) => this.handleInputChange(event)}/>
         </FormItem>
         <FormItem>
            <Button type="primary"
               htmlType="submit"
               className="signup-form-button">Sign Up</Button>
         </FormItem>
      </Form>
    );
  }
}

ReactDOM.render(
  <CreateAccount />,
  document.getElementById('root')
);

export default CreateAccount;
