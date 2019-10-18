import React from 'react';
import ReactDOM from 'react-dom';

class DeliveryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '',
                   phone: '',
                   email: '',
                   address: '',
                   city: '',
                   state: '',
                   zipCode: '',
                   id:''
   };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.loadUser = this.saveUser.bind(this);
  }
  
  /***********************************************************************************
   * State Handlers: These handlers set the states based on the given events. These
   * will corrspond to the user entries in the delivery form.
   ************************************************************************************/
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePhoneNumberChange(event) {
  	this.setState({phone: event.target.value});
  }
  
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleAddressChange(event) {
  	this.setState({address: event.target.value});
  }

  handleCityChange(event) {
  	this.setState({city: event.target.value});
  }

  handleStateChange(event) {
  	this.setState({state: event.target.value});
  }

  handleZipChange(event) {
  	this.setState({zipCode: event.target.value});
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
      const { name } = this.state;
      const { email } = this.state;
      const { address } = this.state;
      const { city } = this.state;
      const { state } = this.state;
      const { zipCode } = this.state;
      const { phone } = this.state;
      alert('Your information was submitted ');
   
      var addr_info = address.concat(' ', city, ' ', state, ' ', zipCode);
    
      //If the admin is logged in the payment type will always be cash. If a regular customer
      //is logged in the payment type will always be paypal. This will determine what page
      //we will go to. In future we need to store these values so we can use them once order is
      //placed in the payment page or the confirm your order page. Add a check to make sure all fields are submitted. 
      fetch('/api/orders/create', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            address: addr_info,
            payment_type: 'cash',
            phone: phone,
            delivered: false,
            camp: 19,
            user_id: 1,
            product_id: 1
         })
      })
   }

  render() {
    return (
      <form align="center" onSubmit={this.handleSubmit}> 
         <h2> In order to get your items to you, we need some information: </h2>
         <label>
            Full name: <br/>
            <input type="text" value={this.state.value} onChange={this.handleNameChange} /> <br/><br/>
         </label>
         <label>
         	Phone number: <br/>
         	<input type="text" value={this.state.value} onChange={this.handlePhoneNumberChange} maxLength="10" /> <br/><br/>
         </label>
         <label>
            Email: <br/>
            <input type="email" value={this.state.value} onChange={this.handleEmailChange} /> <br/><br/>
         </label>
         
         <label>
         	Address: <br/>
         	<input type="text" value={this.state.value} onChange={this.handleAddressChange} /> <br/><br/>
         </label>

         <label>
         	City: <br/>
         	<input type="text" value={this.state.value} onChange={this.handleCityChange} /> <br/><br/>
         </label>

         <label>
         	State: <br/>
         	<input type="text" value={this.state.value} onChange={this.handleStateChange} /> <br/><br/>
         </label>

         <label>
         	Zip Code: <br/>
         	<input type="text" value={this.state.value} onChange={this.handleZipChange} /> <br/><br/>
         </label>

         <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <DeliveryInfo />,
  document.getElementById('root')
);

export default DeliveryInfo;
