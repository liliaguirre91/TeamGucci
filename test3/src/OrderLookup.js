import React from 'react';
import ReactDOM from 'react-dom';

class OrderLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {OrderID: ''

   };


    this.handleIDChange = this.handleIDChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.loadUser = this.saveUser.bind(this);
  }


handleIDChange(event) {
  this.setState({OrderID: event.target.value});
}

  handleSubmit(event) {
    
    event.preventDefault();
    alert('Your information was submitted :)');
  }





  render() {
    return (
      <form align="center" onSubmit={this.handleSubmit}> 
         <h1> Enter your order ID number: </h1>
		 <h3> (It is the 5-digit number from your confirmation page) </h3>
           <input type="text" value={this.state.value} onChange={this.handleIDChange} maxLength="5"/>

         
         
         <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <OrderLookup />,
  document.getElementById('root')
);

export default OrderLookup;
