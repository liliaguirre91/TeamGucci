import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import logo from './admin_logo.png';
//import OrderLookup from './OrderLookup.js';
//import Login from './Login.js';
//import Products from './Products.js';

import CreateAdmin from './CreateAdmin';

import './AdminAccountPage.css';


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



class AdminAccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: '',
                  id:'',
                  page: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.loadUser = this.saveUser.bind(this);
  }
  
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

 /* handleSubmit(event) {
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
//    //const { id } = this.state;
//    this.props.history.push( "user/" + name + "/" + email);
}*/
   
   /*****************************************************************************************
    * Handler: handleClick - This handler will route the application to other existing pages.
    * This handler will be called on the button's click. 
    * Parameters: This handler takes one parameter representing the URL extension where the
    * page that will be accesses will be located.
    * Preconditions: None
    * Postconditions: The user will be rerouted to the correct page
    **************************************************************************************/
   handleClick = param => e => {
      e.preventDefault();
      this.props.history.push(param);
   }

   clicked(){
      console.log("button was clicked");
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit}> 
         {/* WELCOME TITLE */}
            <h1 class="title" align="center"> ADMIN ACCOUNT </h1> 
            <div>
                  {/* LOGO */}
                  <img src={logo} class="center" alt="logo" 
                  height={150}
                  width={150}/><br/>
                  <br/><br/>
            </div>
            <div> 
                  {/* BUTTONS ON HOME PAGE*/}
               <button class="center"> Add a product </button> <br/>
               <button class="center"onClick={ this.handleClick("/campaigns") }> Campaign Configuration </button> <br/>
               <button class="center"> View orders </button> <br/>
               <button class="center" onClick={ this.handleClick("/admin-create-admin") }> Create an Admin</button> <br/>
            </div>
         </form>
      );
   }
}


ReactDOM.render(
  <AdminAccountPage/>,
  document.getElementById('root')
);



export default AdminAccountPage; //I COMMENTED THESE OUT TO MAKE IT RUN IN THE WEB BROWSER

               
         { /* <h3 align="center"> What would you like to do? </h3>*/}
         {/*<button class="center"  onClick={(e) => { e.preventDefault(); this.clicked()} }> Products </button> <br/>*/}

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
