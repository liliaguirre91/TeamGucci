import React from 'react';
import ReactDOM from 'react-dom';
import { createAccount , checkEmail, changeUserInfo, setPassword } from '../../util/APIFunctions';
//import './CreateAccount.css';
import { 
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH, 
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
} from '../../constants';

import {Form, Input, Button, notification } from 'antd';
const FormItem= Form.Item;

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                  name: {
                     value: ''
                  },
                  email: {
                     value: ''
                  },
                  password: {
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
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
  }
  
  /***********************************************************************************
   * State Handlers: These handlers set the states based on the given events. These
   * will corrspond to the user entries in the delivery form.
   ************************************************************************************/
  
  /*This basically does all handlers at once. Also it validates each input as it's entered.
   * This means that each state needs its own validation function. 
   */
   handleInputChange(event, validationFun) {
      const target = event.target;
      const inputName = target.name;
      const inputValue = target.value;
      
      this.setState ({
         [inputName] : {
            value: inputValue,
            ...validationFun(inputValue)
         }
      });
   }
  //if(this.props.crruent user)
//this.setState({name:this.props.currentusre.name})

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
        var name  = this.state.name.value;
        var email = this.state.email.value;
        const password = this.state.password.value;
    
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            if (email === '') {
                 email = currentUser.email;
            }
            if (name === '') {
                name = currentUser.name;
           }
        }
   
      //user id
      let chickenStrips = '';
      if (this.props.currentUser) {
          let currentUser = this.props.currentUser;
          chickenStrips = currentUser.userId;
      }
      console.log(chickenStrips, name, email);
      
      changeUserInfo(chickenStrips, name, email)
      .then(response => {
         notification.success({
            message: 'LCHS Band Fundraising',
            description: "Congratulations! You have succesfully updated your information. Please Login to continue!",
         });
         this.props.history.push("/login");
      }).catch(error => {
         notification.error({
            message: 'LCHS Band Fundraising',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
         });
      });

     
    if(password !== ''){
        setPassword( chickenStrips, password )
            .then( response => {
             this.setState( { customer: response } )
             } )
             .catch(error => {
             notification.error({
             message: 'LCHS Band Fundraising',
             description:error.message || 'Sorry! Something went wrong!'
         });
     });
    }

   }
   isFormInvalid() {
   		return !(this.state.name.validateStatus === 'success' &&
   				 this.state.email.validateStatus === 'success' &&
   				 this.state.password.validateStatus === 'success'
   		);
   }


   handleClick = param => e => {
    e.preventDefault();
    if (this.props.currentUser) {
        let currentUser = this.props.currentUser;
        if(currentUser.role === "Role_USER")
            this.props.history.push("/user-account");
        else
            this.props.history.push("/admin-account")    
    }
 }
   
    render() {
        let name = '';
        let email = '';
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            name = currentUser.name;
            email = currentUser.email;
            //console.log(name);
        }

        return (
            <div className="signup-container">
                <h1 className="page-title">Edit My Info</h1>

                 <div className="signup-content">
                    <Form align="center" onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem
                            label="Full Name"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder={name}
                                value={this.state.name.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                        </FormItem>
                        <FormItem
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder={email}
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}/>
                        </FormItem>
                        <FormItem
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="8-15 characters"
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
                        </FormItem>	 

                        <FormItem>
                            <Button 
                                htmlType="submit"
                                size="large"
                                className="signup-form-button">Submit</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="danger" ghost
                                htmlType="submit"
                                size="large"
                                className="customer-back-button"
                                onClick={this.handleClick()}> Cancel </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

//VALIDATION FUCNTIONS

 validateName = (name) => {
 	if(name.length < NAME_MIN_LENGTH){
 		return{
 			validateStatus: 'error',
 			errorMsg: 'Name is too short (Minimum 4 characters needed.)'
 			}
 	} else if(name.length > NAME_MAX_LENGTH){
 		return{
 			validationStatus: 'error',
 			errorMsg: 'Name is too long (Maximum 40 characters allowed.)'
 		}
 	} else {
 		return{
 			validateStatus: 'success',
 			errorMsg: null,
 		};
 	}
 }

 validateEmail = (email) => {
    if(!email) {
 		return	{
 			validateStatus: 'error',
 			errorMsg: 'Email may not be empty'
 		}
 	}
 	        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email is too long (Maximum 40 characters allowed)'
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }
 	
 	 validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: 'Password is too short (Minimum 8 characters needed.)'
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: 'Password is too long (Maximum 32 characters allowed.)'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }
    
    validateEmailAvailability() {
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);
        
        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }
        
        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });
        
        checkEmail(emailValue)
        .then(response => {
            if (response === 'false') {
                this.setState ({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            }
            else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be rechecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }//end validateEmailAvailability
  
}//end class

ReactDOM.render(
  <EditInfo />,
  document.getElementById('root')
);

export default EditInfo;
