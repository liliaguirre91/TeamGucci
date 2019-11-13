//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { lookupOrder } from './util/APIFunctions';
import './OrderLookup.css';
import { Form, Input, Button, message } from 'antd'
const FormItem= Form.Item;

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

    
   async handleSubmit(event) {
      event.preventDefault();
      /*const url = '/api/orders/search/'+ this.state.OrderID;
      fetch(url)
         .then(response => response.text())
         .then(result => this.setState({ result }));*/
      
      const orderNumber = this.state.OrderID;
      
      await lookupOrder(orderNumber) 
      .then(result => 
         this.setState({ result })
       );
      
            
      /*setTimeout(function() {
         if (this.state.result == 'false')
            alert('Your product has not been delivered!!');
         else if (this.state.result == 'true')
             alert('Your product has been delivered!!');
         else
            alert("Hello");
         this.setState({ submitted: true });
      }.bind(this), 200)
      */
      
         if (this.state.result == 'false') {
            //this.setState({ deliveryInfo: 'Your product has not been delivered yet'});
            //alert('Your product has not been delivered yet');
            message.error('Order number ' + orderNumber + ' has not been delivered yet.');
            this.setState({deliveryInfo:"Your Order has not been delivered yet."});
         }
         else if (this.state.result == 'true') {
            //this.setState({ deliveryInfo: 'Your product has been delivered!!' });
            //alert('Your product has been delivered!');
            message.success('Order number ' + orderNumber + ' has been delivered!')
            this.setState({deliveryInfo: "Your order has been delivered!!"});
         }

         //never triggers because of the await on line 37
        else {
         //this.setState({ deliveryInfo: this.state.result });
         alert('Could not find order');
         this.setState({deliveryInfo:"There is not order with that order number!!"});
        }
      
         
         this.setState({ submitted: true});
      }
   

   

  
   
   render() {
      return (
         <div className="order-search-container">
            <h1 className="page-title">Order Lookup</h1>
            <h2 align="center"> Enter your order ID number: </h2>
            <h3 align="center"> (It is the number from your confirmation page) </h3>
                <Form className="search-form" align="center" onSubmit={this.handleSubmit}> 
                    <FormItem
                        label="Order Number">
                        <Input 
                            size="large"
                            type="text" 
                            autocomplete="off"
                            placeholder="year-number"
                            OrderID={this.state.OrderID} 
                            onChange={this.handleIDChange} maxLength="9"/>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="search-form-button">Search</Button>
                    </FormItem>
                </Form>
                {this.state.submitted &&
                  <h1>{this.state.deliveryInfo}</h1>}
         </div>
      );
   }
}



export default OrderLookup;
