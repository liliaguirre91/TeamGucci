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
                  <br/>
            </div>
            <div>
               <h3 align="center"> About Us</h3>
            </div>
            <div align="center" className="aboutUs">
            The Las Cruces High School Band Program exists to provide music and arts education<br/>
            through marching and concert bands, with the option of jazz bands and winterguard,<br/>
            to the students of Las Cruces High School.<br/>
            <br/>
            The Las Cruces High School Band provides performance opportunities and services to our<br/>
            school and community. Our Luminary Fundraiser is an annual fundrasier that we have to <br/>
            help cut the costs of travel, uniforms and equipment. 
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

