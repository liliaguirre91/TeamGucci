/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: November 21, 2019
 * Description: The EditInfo class component is used by all users to change their name, email, or password. It
 * links back to the users account page once they have finished updating their info.
 * The main handlers/functions in this component are:
 *      - handleInputChange
 *      - handleSubmit
 *      - handleIsFormInvalid
 *      - validateEmailAvailability
 *---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import { checkEmail, changeUserInfo, setPassword } from '../../util/APIFunctions';
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
            name: { value: '' },
            email: { value: '' },
            password: { value: '' },
            id: { value: '' },
            errors: { value: [] }
        };//end state

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    }//end constructor
  
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
        });//end setState
    }//end handleInputChange

    /*******************************************************************************************
     * Handler: handleSubmit() - This handler takes care of sending a user's information to the api
     * to update the user's name, email, or password
     * Parameters: default submit event
     * Preconditions: A field in the handleSubmit must be fielded in
     * Postcondition: The inputted field or fields will be inserted into the users info in the database
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
            }//end if
            if (name === '') {
                name = currentUser.name;
            }//end if
        }//end if
   
        /* user id */
        let chickenStrips = '';
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            chickenStrips = currentUser.userId;
        }//end if
      
        changeUserInfo(chickenStrips, name, email)
            .then(response => {
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Congratulations! You have succesfully updated your information. Please Login to continue!",
                });//end notification
                this.props.history.push("/login");
            })//end then
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });//end notification
            });//end catch

     
        if(password !== ''){
            setPassword( chickenStrips, password )
                .then( response => {
                    this.setState( { customer: response } )
                })//end then
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:error.message || 'Sorry! Something went wrong!'
                    });//end notification
                });//end catch
        }//end if
    }///end handleSubmit
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
        );//end return
    }//end isFormInvalid

    /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleCLick handles the user pressing the back button. It'll redirect based on the user's role.
    * If the user is an admin it'll lead to the admin page otherwise it'll go to the user page
    *---------------------------------------------------------------------------------------------------------------------*/
    handleClick = param => e => {
        e.preventDefault();
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            if(currentUser.role === "Role_USER")
                this.props.history.push("/user-account");
            else
                this.props.history.push("/admin-account")    
        }//end if
    };//end handleClick
   /*---------------------------------------------------------------------------------------------------------------------
    * Function: render takes care of rendering all component elements to the screen. 
    * Then the return includes all JSX/HTML components and their formatting. 
    * In this portion we define the form that will be used in the page. 
    *---------------------------------------------------------------------------------------------------------------------*/ 
    render() {
        let name = '';
        let email = '';
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            name = currentUser.name;
            email = currentUser.email;
        }//end if 

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
        );//end return
    }//end render

/***********************************************************************************
   * VALIDATION FUCNTIONS: These functions check whether or not an inputted value is 
   * valid or not. They also print a message to inform the user what part if any
   * of the inputted values is incorrect 
**************************************************************************************/
    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH){
            return{
                validateStatus: 'error',
                errorMsg: 'Name is too short (Minimum 4 characters needed.)'
            }//end return
        }//end if
        else if(name.length > NAME_MAX_LENGTH){
            return{
                validationStatus: 'error',
                errorMsg: 'Name is too long (Maximum 40 characters allowed.)'
            }//end return
        }//end else if
        else {
            return{
                validateStatus: 'success',
                errorMsg: null,
            };//end return
        }//end else
    }//end validateName

    validateEmail = (email) => {
        if(!email) {
            return	{
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }//end return
        }//end if
        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }//end return
        }//end if

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email is too long (Maximum 40 characters allowed)'
            }//end return
        }//end if

        return {
            validateStatus: null,
            errorMsg: null
        }//end return
    }//end validateEmail
 	
    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: 'Password is too short (Minimum 8 characters needed.)'
            }//end retrn
        }//end if
        else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: 'Password is too long (Maximum 32 characters allowed.)'
            }//end return
        }//end else if
        else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };//end return          
        }//end else
    };//end validatePassword
    
    validateEmailAvailability() {
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);
        
        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });//end setState
            return;
        }//end if
        
        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });//end setState
        
        checkEmail(emailValue)
            .then(response => {
                if (response === 'false') {
                    this.setState ({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });//end setState
                }//end if
                else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        }
                    });//end setState
                }//end else
            })//end then
            .catch(error => {
            /* Marking validateStatus as success, Form will be rechecked at server */
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });//end setState
            });//end catch
    }//end validateEmailAvailability
  
}//end class

ReactDOM.render(
    <EditInfo />,
    document.getElementById('root')
);

export default EditInfo;
