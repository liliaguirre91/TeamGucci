import React from 'react';
import './HomePage.css';
import ReactDOM from 'react-dom';
import { 
    Route, 
    Link, 
    withRouter, 
    Switch 
} from 'react-router-dom'

import logo from './LCHS_logo.png';
import { ACCESS_TOKEN } from './constants';
import { getCurrentUser } from './util/APIFunctions';

import OrderLookup from './OrderLookup';
import Login from './user/login/Login.js';
import CreateAccount from './user/signup/CreateAccount.js';
import Products from './products/Products.js';
import DeliveryInfo from './DeliveryInfo.js';
import AppHeader from './common/AppHeader';
import LoadingIndicator from './common/LoadingIndicator';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout, notification } from 'antd';
const { Content } = Layout;

//import Button from 'react-bootstrap/Button'; {/* imports button styles and functions */}

{/* Button class for all attributes of buttons*/}
/*class Button extends React.Component{

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
}*/



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    currentUser: null,
                    isAuthenticated: false,
                    isLoading: false,
        }

        
        this.handleClick = this.handleClick.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
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
            <h1 class="title" align="center"> Welcome to the Las Cruces High School Band Luminary Fundraiser  </h1> 
            <div>
                  <img src={logo} class="center" alt="logo" 
                  height={150}
                  width={150}/><br/>
                  <br/><br/>
            </div>
            <div> 
               <button class="center" onClick={ this.handleClick("/products") }> View Products </button> <br/>
               <button class="center" onClick={ this.handleClick("/login") }> Login </button> <br/>
               <button class="center" onClick={ this.handleClick("/signup") }> Create Account </button> <br/>
               <button class="center" onClick={(e) => { e.preventDefault(); this.clicked()} }> Account </button> <br/>
               <button class="center" onClick={ this.handleClick("/order-lookup") }> Order search </button> <br/>
            </div>
         </form>
      );
   }
}


/*ReactDOM.render(
  <HomePage/>,
  document.getElementById('root')
);*/



export default withRouter(HomePage); //I COMMENTED THESE OUT TO MAKE IT RUN IN THE WEB BROWSER

