import React, { Component } from 'react';
import { lookupOrder, getProductsOrdered, getProduct } from './util/APIFunctions';
import './OrderLookup.css';
import { Form, Input, Button, message, Table, notification } from 'antd'
const FormItem= Form.Item;

const items = [];
class OrderLookup extends Component {
   constructor(props) {
      super(props);
      this.state = { 
         OrderID: '',
         result: '',
         deliveryInfo:'',
         submitted: false,
         productsOrdered: [],
         temp: ''
      };
      this.handleIDChange = this.handleIDChange.bind(this);    
      this.handleSubmit = this.handleSubmit.bind(this);
   //this.loadUser = this.saveUser.bind(this);
  }

   handleIDChange(event) {
      this.setState({OrderID: event.target.value});
   }

    
   async handleSubmit(event) {
      items.length =0;
      event.preventDefault();
      /*const url = '/api/orders/search/'+ this.state.OrderID;
      fetch(url)
         .then(response => response.text())
         .then(result => this.setState({ result }));*/
      
      const orderNumber = this.state.OrderID;
      const productNames = [];
      const productQuantities = [];
      
      //lookup order number and return if delivered or not
      await lookupOrder(orderNumber) 
      .then(result => 
         this.setState({ result })
       );
      
       //get the products ordered attached to the order number
       await getProductsOrdered(orderNumber)
       .then (response => {
          this.setState({
            productsOrdered: response
          })
       })
       .catch(error => {
         notification.error({
             message: '',
             description: error.message
         });
     })
     for (var i = 0; i < this.state.productsOrdered.length; i++) {
        await getProduct( this.state.productsOrdered[ i ].productId )
        .then( response => {
           this.setState( { temp: response });
        })
        .catch(error => {
         notification.error({
             message: 'Error error Mr.Robinson',
             description: error.message
         });
      } )
        const name = this.state.temp.product
      productNames.push( name );
      productQuantities.push( this.state.productsOrdered[ i ].quantity );
         /*const item = { productId: getProduct( this.state.productOrdered[i].productId ), quantity: this.state.productOrdered[i].quantity, orderId: this.state.productOrdered[i].orderId }
         console.log(item);
         items.push(item);*/
      }
      for (var i = 0; i < this.state.productsOrdered.length; i++) {
            const item = { productId: productNames[ i ] , quantity: productQuantities[  i ] }
            console.log(item);
            items.push(item);
         }
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
         //check if order has been delivered or not, give a message saying yes or no
         if (this.state.result === 'false') {
            
            message.error('Order number ' + orderNumber + ' has not been delivered yet.');
            this.setState({deliveryInfo:"Your Order has not been delivered yet."});
            
         }
         else if (this.state.result === 'true') {
            
            message.success('Order number ' + orderNumber + ' has been delivered!')
            this.setState({deliveryInfo: "Your order has been delivered!!"});
           
         }

         //order could not be found
         //never triggers because of the await on line 38
        else {
         
         alert('Could not find order');
         this.setState({deliveryInfo:"There is no order with that order number!!"});
         
        }
      
         this.setState({ submitted: true});
      }  
   
   render() {
      //table columns
      const columns = [
         {
            title:'Products',
            dataIndex: 'productId',
            key: 'productId'
         },
         {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
         }
      ];
      
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
                  <Table columns = {columns} dataSource = {items} pagination = {false} size = 'middle'/>
         </div>
      );
   }
}



export default OrderLookup;
