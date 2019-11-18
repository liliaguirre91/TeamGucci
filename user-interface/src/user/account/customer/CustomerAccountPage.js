import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import logo from '../admin/admin_logo.png';
//import OrderLookup from './OrderLookup.js';
//import Login from './Login.js';
//import Products from './Products.js';

//import CreateAdmin from './CreateAdmin';

//import './AdminAccountPage.css';


//import Button from 'react-bootstrap/Button'; {/* imports button styles and functions */}


class CustomerAccountPage extends React.Component {
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
        let user_name = ""
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            user_name = currentUser.name;
             console.log(user_name);
        }
       
      return (
         <form onSubmit={this.handleSubmit}> 
         {/* WELCOME TITLE */}
            <h1 class="title" align="center"> CUSTOMER ACCOUNT </h1> 
            <h2> {user_name}</h2>
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
  <CustomerAccountPage/>,
  document.getElementById('root')
);

export default CustomerAccountPage; //I COMMENTED THESE OUT TO MAKE IT RUN IN THE WEB BROWSER
