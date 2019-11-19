import React from 'react';
import './HomePage.css';
import { withRouter } from 'react-router-dom'

import logo from './LCHS_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';



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
      if (param === "/products") {
          localStorage.removeItem('cart');
      }
      this.props.history.push(param);
   }

   clicked(){
      console.log("button was clicked");
   }

   render() {
       console.log(localStorage.getItem('cart'));
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
               <button class="center" onClick={ this.handleClick("/order-lookup") }> Order search </button> <br/>

               <button class="center" onClick={ this.handleClick("/order-confirmation") }> SUCCESS </button><br/>
               <button class="center" onClick={ this.handleClick("/failure-page") }> FAIL </button><br/>

               
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

