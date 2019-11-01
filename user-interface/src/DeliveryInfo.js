import React from 'react';
import ReactDOM from 'react-dom';
import './DeliveryInfo.css';
import { createOrder, createProductsOrdered } from './util/APIFunctions';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input/input';
import {Form, Input, Button, notification } from 'antd';
import {
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH, 
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
} from './constants';


const FormItem = Form.Item;

class DeliveryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    			   name:    { value: '' },
                   phone:   { value: '' },
                   address: { value: '' },
                   city: 	{ value: '' },
                   st:	 	{ value: '' },
                   zipCode: { value: '' },
                   order_id: 0
   };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  
  }
  
  /***********************************************************************************
   * State Handlers: These handlers set the states based on the given events. These
   * will corrspond to the user entries in the delivery form.
   ************************************************************************************/
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
   
   //handlePhoneChange(event) {
       

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
        let user_id = -1;
        const name  = this.state.name.value;
        const phone = this.state.phone.value;
        const address = this.state.address.value;
        const city = this.state.city.value;
        const st = this.state.st.value;
        const zipCode = this.state.zipCode.value;
        
        var addr_info = address.concat(' ', city, ' ', st, ' ', zipCode);

        /********************************************************************************************
        If the admin is logged in the payment type will always be cash. If a regular customer
        is logged in the payment type will always be paypal. This will determine what page
        we will go to. In future we need to store these values so we can use them once order is
        placed in the payment page or the confirm your order page. Add a check to make sure all fields are submitted. 
        This will ultimately go on the payment page, once the customer has paid for the products. Payment type 
        will depend on user type, campaign will depend on the product or the current campaign? Before placing 
        the order make sure payment went through correctly. So check response from paypal.
        ********************************************************************************************/
        
        if(this.props.currentUser) {
            let currentUser = this.props.currentUser;
            user_id = currentUser.userId;
            //console.log(user_id);
        }
            
      
        const orderInfo = {
            address: addr_info,
            payment_type: 'cash',
            phone: phone,
            delivered: false,
            camp: 19,
            user_id: user_id
        };

        /* Call the createOrder function to create order in database */
        createOrder(orderInfo)
            .then((order_id) => this.setState({ order_id }))
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong!'
                });
            });
        
            
        /*Implementing insertion of multiple products tied to one order number*/
        setTimeout(function() {
            const orderID = this.state.order_id;
        
            let cart = JSON.parse(localStorage.getItem('cart'));
            //let productID = Object.keys(cart)[1];
            let cartSize = Object.keys(cart).length;
            let keys = Object.keys(cart); 
            
            for (var i = 0; i < cartSize; i++) {
                //console.log(keys[i] + ":" + cart[keys[i]]);
                let productID = keys[i];
                let quantity = cart[keys[i]];
                const productsOrdered = {
                    orderId: parseInt(orderID, 10),
                    productId: productID,
                    quantity: quantity
                };
                    
                createProductsOrdered(productsOrdered)
                    .then (response => {
                        notification.success({
                            message: 'LCHS Band Fundraising',
                            description: "Your order has been placed!"
                        });
                        this.props.history.push("/"); //for now will redirect to home, later to confirmation
                    })
                    .catch(error => {
                        notification.error({
                            message: 'LCHS Band Fundraising',
                            description:error.message || 'Sorry! Something went wrong!'
                        });
                    });
            }
            
            localStorage.removeItem('cart')
        }.bind(this), 500)
        
      /*setTimeout(function() {
        alert(JSON.parse(this.state.order_id));
      }.bind(this), 500)*/
          /*response => {
         notification.success({
            message: 'LCHS Band Fundraising',
            description: "Your order has been placed!"
         });
         this.props.history.push("/"); //for now will redirect to home, later to confirmation
      }).catch(error => {
         notification.error({
            message: 'LCHS Band Fundraising',
            description: error.message || 'Sorry! Something went wrong!'
         });
      });*/
   }

   isFormInvalid() {
   	return !(this.state.name.validateStatus === 'success' &&
   			 this.state.address.validateStatus === 'success' &&
   			 this.state.city.validateStatus === 'success' &&
  			 this.state.st.validateStatus === 'success' &&
   			 this.state.zipCode.validateStatus === 'success'
   		);
   }
   

  render() {
    return (
        <div className="delivery-info-container">
            <h2 className="page-title"> Delivery Information Form </h2>
            <h5 align="center"> In order to get your items to you, we require some information </h5>
                <div className="delivery-form-content">
                    <Form align="center" onSubmit={this.handleSubmit} className="delivery-form"> 
                        <FormItem
                            label="Full Name"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Your full name"
                                value={this.state.name.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                        </FormItem>

                        <FormItem
                            label="Phone"
                            validateStatus={this.state.phone.validateStatus}
                            help={this.state.phone.errorMsg}>
                            <Input
                                name="phone"
                                placeholder="##########"
                                maxLength="10"
                                value={ this.state.phone.value }
                                onChange={(event) => this.handleInputChange(event, this.validatePhone) }/>
                    </FormItem>
                    <FormItem
                            label="Address"
                            validateStatus={this.state.address.validateStatus}
                            help={this.state.address.errorMsg}>
                            <Input
                                size="large"
                                name="address"
                                autoComplete="off"
                                placeholder="1234 Street Name"
                                maxLength="20"
                                value={this.state.address.value}
                                onChange={(event) => this.handleInputChange(event, this.validateAddress)}/>
                        </FormItem>
                        <FormItem
                            label="City"
                            validateStatus={this.state.city.validateStatus}
                            help={this.state.city.errorMsg}>
                            <Input
                                size="large"
                                name="city"
                                autoComplete="off"
                                placeholder="Your city"
                                maxLength="20"
                                value={this.state.city.value}
                                onChange={(event) => this.handleInputChange(event, this.validateCity)}/>
                        </FormItem>
                        
                        <FormItem
                            label="State"
                            validateStatus={this.state.st.validateStatus}
                            help={this.state.st.errorMsg}>
                            <Input
                                size="large"
                                name="st"
                                autoComplete="off"
                                placeholder="Your state"
                                maxLength="15"
                                value={this.state.st.value}
                                onChange={(event) => this.handleInputChange(event, this.validateSt)}/>
                        </FormItem>
                        
                        <FormItem
                            label="Zip Code"
                            validateStatus={this.state.zipCode.validateStatus}
                            help={this.state.zipCode.errorMsg}>
                            <Input
                                size="large"
                                name="zipCode"
                                autoComplete="off"
                                placeholder="Zip code"
                                maxLength="5"
                                value={this.state.zipCode.value}
                                onChange={(event) => this.handleInputChange(event, this.validateZipcode)}/>
                        </FormItem>

                        <FormItem>
                            <Button type="primary"
                            htmlType="submit"
                            size="large"
                            className="delivery-form-button"
                            disabled={this.isFormInvalid()}>Continue</Button>
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

 validatePhone = (phone) => {
 	if(phone.length > 10) {
 		return{
 			validateStatus: 'error',
 			errorMsg: 'Invalid phone number. Please enter the phone number in the shown format.'
 		}
 	} else {
 		return{
 			validateStatus: 'success',
 			errorMsg: null,
 			};
 		}
 	}

 validateAddress = ( address ) => {
 	if( address.length < 3){
 		return{
 		validateStatus: 'error',
 		errorMsg: 'Not a valid address'
 		}
 	} else {
 		return{
 			validateStatus: 'success',
 			errorMsg: null,
 			};
 		}
 }

 validateCity = ( city ) => {
 	if( city.length < 3){
 		return{
 		validateStatus: 'error',
 		errorMsg: 'Not a valid city'
 		}
 	} else {
 		return{
 			validateStatus: 'success',
 			errorMsg: null,
 			};
 		}
 }

  validateSt = ( st ) => {
 	if( st.length < 2){
 		return{
 		validateStatus: 'error',
 		errorMsg: 'Not a valid state'
 		}
 	} else {
 		return{
 			validateStatus: 'success',
 			errorMsg: null,
 			};
 		}
 }

   validateZipcode = ( zipCode ) => {
 	if( zipCode.length < 5){
 		return{
 		validateStatus: 'error',
 		errorMsg: 'Not a valid zip code'
 		}
 	} else {
 		return{
 			validateStatus: 'success',
 			errorMsg: null,
 			};
 		}
    }
 		
}//end of class

ReactDOM.render(
  <DeliveryInfo />,
  document.getElementById('root')
);

export default DeliveryInfo;
