/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: October 9, 2019
 * Description: The OrderLookup class components allows a user to find out whether or not an order was delivered.
 * This page has a form for users to insert the order number they wish to lookup. The user is given a notification
 * of the delivery status as well as a table containing all of the products ordered.
 * The main handlers/functions in this component are:
 *      - handleIDChange
 *      - handleSubmit
 *---------------------------------------------------------------------------------------------------------------------*/
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

    /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleIDChange handles the change of state for the order id. It takes an event which is the
    * change of the input and assigns the new value to the OrderID status
    *---------------------------------------------------------------------------------------------------------------------*/
    handleIDChange(event) {
        this.setState({OrderID: event.target.value});
    }//end handleIDChange

    
    /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleSubmit takes a submit event, it takes the order id and finds all of the information
    * about the order if it has any information to be fetched. It then shows all the information it found
    * about the order.
    * Preconditions:
    *       - The OrderID state must be set
    * Postconditions:
    *       - The delivery status and all products ordered in the specified order are shown on the page
    *---------------------------------------------------------------------------------------------------------------------*/
    async handleSubmit(event) {
        items.length =0;
        event.preventDefault();
        var orderNumber = 0;
        if (this.state.OrderID.includes('-'))
            orderNumber  = this.state.OrderID.split('-')[1];
        else
            orderNumber  = this.state.OrderID
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
            this.setState({deliveryInfo:"Your Order has not been delivered yet."});
        }//end if
        else if (this.state.result === 'true') {
            this.setState({deliveryInfo: "Your order has been delivered!!"});
        }//end if

        /* order could not be found */
        /* never triggers because of the await on line 38 */
        else {
            this.setState({deliveryInfo:"There is no order with that order number!!"});
        }//end else
        this.setState({ submitted: true});
    }//end handleSubmit
    
    /*---------------------------------------------------------------------------------------------------------------------
    * Function: render takes care of rendering all component elements to the screen. Here we define the table's
    * columns. Then the return includes all JSX/HTML components and their formatting. In this portion we define 
    * the table, and form that will be used in the page. 
    *---------------------------------------------------------------------------------------------------------------------*/ 
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
