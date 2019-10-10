import React from 'react';
import ReactDOM from 'react-dom';

class DeliveryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
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



  handleSubmit(event) {
    
    event.preventDefault();
    const { name } = this.state;
    const { email } = this.state;
    const { address } = this.state;
    alert('Your infomration was submitted :)');
   /* alert('A name and email were submitted: ' + name + ' ' + email);
    UserDataService.retrieveUserInfo(name, email)
      .then((res) => {
         let user = res.data.result;
         this.setState({
            id: user.name
         })
      });
    //const { id } = this.state;*/
   // this.props.history.push( "user/" + name + "/" + email);
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
         	<input type="text" value={this.state.value} onChange={this.handlePhoneNumberChange} /> <br/><br/>
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
