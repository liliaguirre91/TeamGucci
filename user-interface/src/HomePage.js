/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: October 4, 2019
 * Description: The HomePage class component is used as the starting point of the website. It is the welcome page
 * for all users. It has an about us to tell users the point of the website
 *---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import './HomePage.css';
import { withRouter } from 'react-router-dom'
import logo from './LCHS_band_logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Function: render takes care of rendering all component elements to the screen. Then the return includes all 
    * JSX/HTML components and their formatting. In this portion we define the welcome and about us
    *---------------------------------------------------------------------------------------------------------------------*/ 
   render() {
      return (
         <form onSubmit={this.handleSubmit}> 
            <h1 class="title" align="center"> Welcome to the Las Cruces High School Band Luminary Fundraiser  </h1> 
            <div>
                  <img src={logo} class="center" alt="logo" 
                  height={250}
                  width={250}/><br/>
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

export default withRouter(HomePage); 