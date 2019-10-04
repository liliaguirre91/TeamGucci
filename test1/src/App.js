import React, { Component } from 'react';
import logo from './LCHS_logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      //<div className="App">
       // <div className="App-header">
        <div>  <img src={logo} /*className="App-logo"*/ alt="logo" 
          	height={90}
        	width={90}
          />
          <h1> Welcome to the Las Cruces High School Band 
          <br/> Luminary Fundraiser </h1>
        </div>
        <div>
        <p className="App-intro">
			<h3> What would you like to do? </h3>
			<button text="Products" />
        </p>
      </div>
    );
  }
}

export default App;
