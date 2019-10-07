import React from 'react';
import ReactDOM from 'react-dom';
//import UserDataService from "../service/UserDataService.js";
import logo from './LCHS_logo.png';
import './HomePage.css'




//import Button from 'react-bootstrap/Button'; {/* imports button styles and functions */}



{/* Button class for all attributes of buttons*/}
class Button extends React.Component{

render(){
	const{
	 color, variant, content, ...others
	} = this.props;

	return(
	<button className={color}{...others}>
	{content}
	</button>
	)
  }
}



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: '',
                  id:''



    
   };



    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.loadUser = this.saveUser.bind(this);
  }
  
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
//    
//    event.preventDefault();
//    const { name } = this.state;
//    const { email } = this.state;
//    alert('A name and email were submitted: ' + name + ' ' + email);
//    
//    /*UserDataService.retrieveUserInfo(name, email)
//      .then((res) => {
//         let user = res.data.result;
//         this.setState({
//            id: user.name
//         })
//      });
//    //const { id } = this.state;*/
//    this.props.history.push( "user/" + name + "/" + email);

    
  }

  clicked(){
console.log("button was clicked");
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
      {/* WELCOME TITLE */}
         <h1 align="center"> Welcome to the Las Cruces High School Band Luminary Fundraiser  </h1> 


 <div>
      {/* LOGO */}
        <img src={logo} class="center" alt="logo" 
        height={150}
        width={150}/><br/>

        <br/><br/>
</div>

    
<div> 
  	   {/* BUTTONS ON HOME PAGE*/}
  	   
{ /* <h3 align="center"> What would you like to do? </h3>*/}
{/*<button class="center"  onClick={(e) => { e.preventDefault(); this.clicked()} }> Products </button> <br/>*/}

<Button color="green" class="center" position="absolute" content="View Products" onClick={(e) => { e.preventDefault(); this.clicked()}} /><br/>




<button class="center" onClick={(e) => { e.preventDefault(); this.clicked()} }> Login </button> <br/>

<button class="center" onClick={(e) => { e.preventDefault(); this.clicked()} }> Create an account </button> <br/>
	
<button class="center" onClick={(e) => { e.preventDefault(); this.clicked()} }> Order search </button> <br/>

</div>



{/*
<Button content="Sample Button" variant="green" />
<button type="button" class="btn btn-primary" > DID IT WORK </button>
*/}


{/*

         <label>
            Full name: <br/>
            <input type="text" value={this.state.value}  onChange={this.handleNameChange} /> <br/>
         </label>
         <label>
            Email: <br/>
            <input type="text" value={this.state.value} onChange={this.handleEmailChange} /> <br/><br/>
         </label>
         
         <input type="submit" value="Submit" />

*/}

      </form>
    );
  }
}

ReactDOM.render(
  <HomePage />,
  document.getElementById('root')
);

export default HomePage; //I COMMENTED THESE OUT TO MAKE IT RUN IN THE WEB BROWSER
