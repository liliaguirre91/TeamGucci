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
        };//end state
        this.handleIDChange = this.handleIDChange.bind(this);    
        this.handleSubmit = this.handleSubmit.bind(this);
    }//end constructor

    handleIDChange(event) {
        this.setState({OrderID: event.target.value});
    }//end handleIDChange

    
    async handleSubmit(event) {
        items.length =0;
        event.preventDefault();
        const orderNumber  = this.state.OrderID.split('-')[1];
        const productNames = [];
        const productQuantities = [];
        
        /* lookup order number and return if delivered or not */
        await lookupOrder(orderNumber) 
            .then(result => 
                this.setState({ result })
            );//end then
        
        /* get the products ordered attached to the order number */
        await getProductsOrdered(orderNumber)
            .then (response => {
                this.setState({
                    productsOrdered: response
                })//end setState
            })//end then
            .catch(error => {
                notification.error({
                    message: '',
                    description: error.message
                });//end notification
            })//end catch
        for (var i = 0; i < this.state.productsOrdered.length; i++) {
            await getProduct( this.state.productsOrdered[ i ].productId )
                .then( response => {
                    this.setState( { temp: response });
                })//end then
                .catch(error => {
                    notification.error({
                        message: 'There was an error please try again',
                        description: error.message
                    });//end notification
                })//end catch
            const name = this.state.temp.product
            productNames.push( name );
            productQuantities.push( this.state.productsOrdered[ i ].quantity );
        }//end for
        for (var i = 0; i < this.state.productsOrdered.length; i++) {
                const item = { productId: productNames[ i ] , quantity: productQuantities[  i ] }
                items.push(item);
        }//end for
        /* check if order has been delivered or not, give a message saying yes or no */
        if (this.state.result === 'false') {     
            message.error('Order number ' + orderNumber + ' has not been delivered yet.');
            this.setState({deliveryInfo:"Your Order has not been delivered yet."});
        }//end if
        else if (this.state.result === 'true') {
            message.success('Order number ' + orderNumber + ' has been delivered!')
            this.setState({deliveryInfo: "Your order has been delivered!!"});
        }//end if

        /* order could not be found */
        /* never triggers because of the await on line 38 */
        else {
            this.setState({deliveryInfo:"There is no order with that order number!!"});
        }//end else
        this.setState({ submitted: true});
    }//end handleSubmit
    
    render() {
        /* table columns */
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
        ];//end columns
        
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
                                placeholder="year-order#"
                                OrderID={this.state.OrderID} 
                                onChange={this.handleIDChange} maxLength="9"/>
                        </FormItem>
                        <FormItem>
                            <Button
                                    htmlType="submit"
                                    size="large"
                                className="search-form-button">Search</Button>
                        </FormItem>
                    </Form>
                    {this.state.submitted &&
                        <div>
                        <h3 align="center">{this.state.deliveryInfo}</h3><br/>
                        <Table columns = {columns} dataSource = {items} pagination = {false} size = 'middle'/>
                        </div>
                    }
            </div>
        );//end return
    }//end render
}//end OrderLookup
export default OrderLookup;