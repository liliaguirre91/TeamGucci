//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { lookupOrder } from './util/APIFunctions';
import { notification } from 'antd'

class OrderLookup extends Component {
   constructor(props) {
      super(props);
      this.state = { 
         OrderID: '',
         result: '',
         deliveryInfo:'',
         submitted: false
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
      /*const url = '/api/orders/search/'+ this.state.OrderID;
      fetch(url)
         .then(response => response.text())
         .then(result => this.setState({ result }));*/
      
      const orderNumber = this.state.OrderID;
      lookupOrder(orderNumber)
      .then(result => 
         this.setState({ result })
       );
       
      
            
      setTimeout(function() {
         if (this.state.result == 'false')
            alert('Your product has not been delivered!!');
         else if (this.state.result == 'true')
             alert('Your product has been delivered!!');
         else
            alert(this.state.result);
      }.bind(this), 200)
      
      this.setState({ submitted: true });

      if (this.state.result == 'false')
         this.setState({ deliveryInfo: 'Your product has not been delivery yet'});
      else if (this.state.result == 'true')
         this.setState({ deliveryInfo: 'Your product has been delivered!!' });
      else
         this.setState({ deliveryInfo: this.state.result });
      
      
      
   }

   
   renderDeliveryInfo() {
      return <OrderLookup OrderID={this.state.OrderID}/>
   }
   
   render() {
      return (
         <div>
         <form align="center" onSubmit={this.handleSubmit}> 
            <h1> Enter your order ID number: </h1>
            <h3> (It is the 5-digit number from your confirmation page) </h3>
            <input type="text" OrderID={this.state.OrderID} onChange={this.handleIDChange} maxLength="5"/>
            <input type="submit" value="Submit" />
         </form>
         {this.state.submitted && this.renderDeliveryInfo()}
         </div>
      );
   }
}

ReactDOM.render(
  <OrderLookup />,
  document.getElementById('root')
);

export default OrderLookup;
