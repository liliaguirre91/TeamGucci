import React from 'react';
import ReactDOM from 'react-dom';

class DeliveryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: '',
                  address: '',
                  id:''
   };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.loadUser = this.saveUser.bind(this);
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
    const { name } = this.state;
    const { email } = this.state;
    const { address } = this.state;
    alert('A name and email were submitted: ' + name + ' ' + email);
    /*UserDataService.retrieveUserInfo(name, email)
      .then((res) => {
         let user = res.data.result;
         this.setState({
            id: user.name
         })
      });
    //const { id } = this.state;*/
    //this.props.history.push( "order-confirmation");
    
    //If the admin is logged in the payment type will always be cash. If a regular customer
    //is logged in the payment type will always be paypal. This will determine what page
    //we will go to. In future we need to store these values so we can use them once order is
    //placed in the payment page or the confirm your order page
    fetch('/api/orders/create', {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
          address: email,
          payment_type: 'cash',
          delivered: false,
          camp: 19,
          user_id: 1,
          product_id: 1
       })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
         <h1> Delivery Information </h1>
         <label>
            Full name: <br/>
            <input type="text" value={this.state.value} onChange={this.handleNameChange} /> <br/><br/>
         </label>
         
         <label>
            Email: <br/>
            <input type="email" value={this.state.value} onChange={this.handleEmailChange} /> <br/><br/>
         </label>
         
         <label>
         	Address: <br/>
         	<input type="text" value={this.state.value} onChange={this.handleAddressChange} /> <br/><br/>
         </label>
         
         <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <DeliveryForm />,
  document.getElementById('root')
);

export default DeliveryForm;
