import React from 'react';
import ReactDOM from 'react-dom';

function validate(name, email, address, city, state, zipCode) {

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
}

function validateLogin(memberEmail, password) {
	const loginErrors = [];

	if(memberEmail.length < 5){
		loginErrors.push("Please use a valid email");
	}
  	if(memberEmail.split("").filter(x => x === "@").length !== 1) {
    	loginErrors.push("Email should contain a @");
  	}
	if(password.length < 6){
		loginErrors.push("Password should be at least 6 characters long");
	}

	return loginErrors;
}

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
                  memberEmail:'',
                  password:'',
                  errors: [],
                  loginErrors: []
   };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);

    this.handleMemberEmailChange = this.handleMemberEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleSubmit.bind(this);
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

  handleMemberEmailChange(event) {
  	this.setState({memberEmail: event.target.value});
  }

  handlePasswordChange(event) {
  	this.setState({password: event.target.value});
  }

  handleLogin(event) {
      const { memberEmail } = this.state;
      const { password } = this.state;
      const loginErrors = validateLogin(memberEmail, password);
      const url = '/api/users/search/'+ this.state.password + '/' + this.state.email;
      
      if(loginErrors.length > 0){
         this.setState({ loginErrors });
         return;
      }
      fetch(url)
      alert('Congratulations' + this.state.name + ', you have logged in!');
      this.props.history.push("/");
  }

  handleSubmit(event) {
    
    event.preventDefault();
    const { name } = this.state;
    const { email } = this.state;
    const { address } = this.state;
    const { city } = this.state;
    const { state } = this.state;
    const { zipCode } = this.state;

    //const { memberEmail } = this.state;
    //const { password } = this.state;

   const errors = validate(name, email, address, city, state, zipCode);
	//const loginErrors = validateLogin(memberEmail, password);
	if(errors.length > 0){
		this.setState({ errors });
		return;
	}
	
   var addr_info = address.concat(' ', city, ' ', state, ' ', zipCode);
	fetch('/api/users/create', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email,
            name: name,
            address: addr_info,
            levels: 2,
            comments: "Hello"
         })
      })
      .then(response => response.text())
      .then(result => this.setState({ result }));
      alert('Congratulations ' + name + ', you have created an Account!');
      this.props.history.push("/");
    
  }

  render() {
     const { errors } = this.state;
     const { loginErrors } = this.state;
     return (



	<form align="center" onSubmit={this.handleSubmit}> 
        {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))}
        {loginErrors.map(error => (
          <p key={error}> Login Error: {error}</p>
        ))}
        
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
