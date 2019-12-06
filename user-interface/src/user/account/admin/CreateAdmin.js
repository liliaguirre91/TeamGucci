/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: November 12, 2019
 * Description: The CreateAdmin class component allows the root admin to create more low level admins. This
 * page behaves the same way as createAccount but it creates an admin instead of a user.
 * The main handlers/function s in this component are:
 *      - handleInputChange
 *      - handleSubmit
 *      - handleClick
 *      - isFormInvalid
 *      - validateEmailAddress
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import { checkEmail, createAdmin } from '../../../util/APIFunctions'; //PROBABLY NEED
import './CreateAdmin.css';
import {Form, Input, Button, notification } from 'antd';

const FormItem = Form.Item;

class CreateAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                name:     { value: '' },
                email:    { value: '' },
                password: { value: '' },
                id:       { value: '' },
                errors:   { value: [] }
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
        const password = this.state.password.value;


        //Create a constant containing all the information necessary to create a user account in database

        const adminInfo = {

            name: name,
            email: email,
            password: password

        };

        //Call the createAccount function to insert user into database

        createAdmin(adminInfo)
            .then(response => {
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Congratulations! You have succesfully created an admin.",
                });
                this.props.history.push("/");
            }).catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
    }

    /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleClick will handle the action of the back button. If the back button is clicked, the user will be
    * redirected to the previous page. In this case the user account page.
    *---------------------------------------------------------------------------------------------------------------------*/ 
    handleClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
    }

    /*---------------------------------------------------------------------------------------------------------------------
     * Function: isFormInvalid checks whether or not the inputted values are valid or not
     * Parameters: None
     * Preconditions:
     *      - None
     * Postconditions: 
     *      - Returns true or false based on the validity of the input 
     *---------------------------------------------------------------------------------------------------------------------*/  
    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
                 this.state.email.validateStatus === 'success' &&
                 this.state.password.validateStatus === 'success'
                );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title"> Create a new Admin account </h1>
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
                                    placeholder="Admin's full name"
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
                                    placeholder="Admin's email"
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
                                <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}> Create </Button>
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
            </div>
        );
    }

/***********************************************************************************
   * VALIDATION FUCNTIONS: These functions check whether or not an inputted value is 
   * valid or not. They also print a message to inform the user what part if any
   * of the inputted values is incorrect 
**************************************************************************************/
    validateName = (name) => {
        if(name.length < 4){
            return {
                validateStatus: 'error',
                errorMsg: 'Name is too short (Minimum 4 characters needed.)'
            }
        } else if(name.length > 40){
            return {
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
            return  {
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

        if(email.length > 40) {
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
        if(password.length < 8) {
            return {
                validateStatus: 'error',
                errorMsg: 'Password is too short (Minimum 8 characters needed.)'
            }
        } else if (password.length > 15) {
            return {
                validationStatus: 'error',
                errorMsg: 'Password is too long (Maximum 15 characters allowed.)'
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
  <CreateAdmin />,
  document.getElementById('root')
);

export default CreateAdmin;
