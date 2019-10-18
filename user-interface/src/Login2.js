import React from 'react';
import ReactDOM from 'react-dom';

/*function validate(name, email, address, city, state, zipCode) {

	const errors = [];

	if(name.length === 0){
		errors.push("Fill in your name please");
	}
	if(email.length < 5){
		errors.push("Please use a valid email");
	}
  	if(email.split("").filter(x => x === "@").length !== 1) {
    	errors.push("Email should contain a @");
  	}
  	if(address.length === 0){
		errors.push("Fill in your address please");
	}
	if(city.length === 0){
		errors.push("Fill in your city please");
	}
	if(state.length === 0){
		errors.push("Fill in your state please");
	}
	if(zipCode.length === 0){
		errors.push("Fill in your zip code please");
	}

	return errors;
}*/

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: '',
                  address: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  id:'',
                  errors: []
   };

    this.handleNameChange = this.handleNameChange.bind(this);
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
    const { city } = this.state;
    const { state } = this.state;
    const { zipCode } = this.state;

   /* alert('A name and email were submitted: ' + name + ' ' + email);
    UserDataService.retrieveUserInfo(name, email)
      .then((res) => {
         let user = res.data.result;
         this.setState({
            id: user.name
         })
      });
    //const { id } = this.state;*/
    //this.props.history.push( "user/" + name + "/" + email);

	/*const errors = validate(name, email, address, city, state, zipCode);
	if(errors.length > 0){
		this.setState({ errors });
		return;
	}*/
	    alert('Your information was submitted :)');

    
  }

  render() {
    return (

	<form align="center" onSubmit={this.handleSubmit}> 

         <h3> Fill in the blanks below <br/> to create a new account </h3>
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
  <Login />,
  document.getElementById('root')
);

export default Login;
