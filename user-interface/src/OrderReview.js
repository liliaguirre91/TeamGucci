import React from 'react';
import ReactDOM from 'react-dom';
import { 
    Link, 
    withRouter, 
} from 'react-router-dom'
import { createOrder, createProductsOrdered } from './util/APIFunctions';
import {Form, Input, Button, notification } from 'antd';

class OrderReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  order_id: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = param => e => {
      e.preventDefault();
      this.props.history.push(param);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        localStorage.removeItem('cart')
        this.props.history.push("/");
        /*var order_created = true;
        var products_added = true;
        let user_id = -2;
        let cashOrderInfo = JSON.parse(localStorage.getItem('cashOrderInfo'));
        //console.log(cashOrderInfo);
         /* Call the createOrder function to create order in database */
        /*createOrder(cashOrderInfo)
            .then((order_id) => {this.setState({ order_id }); alert(this.state.order_id)})
            .catch(error => {
                order_created = false;
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong!'
                });
            });
        
            
        /*Implementing insertion of multiple products tied to one order number*/
        /*setTimeout(function() {
            console.log(this.state.order_id);
            const orderID = this.state.order_id;
                            
            let cart = JSON.parse(localStorage.getItem('cart'));
            let cartSize = Object.keys(cart).length;
            let keys = Object.keys(cart); 
                    
            for (var i = 0; i < cartSize; i++) {
                //console.log(keys[i] + ":" + cart[keys[i]]);
                let productID = keys[i];
                let quantity = cart[keys[i]];
                const productsOrdered = {
                    orderId: parseInt(orderID, 10),
                    productId: productID,
                    quantity: quantity
                };
                    
                if (order_created === true) {
                    createProductsOrdered(productsOrdered)
                        /*.then (response => {
                            notification.success({
                                message: 'LCHS Band Fundraising',
                                description: "Your order has been placed!"
                            });
                            this.props.history.push("/"); //for now will redirect to home, later to order confirmation
                        })*/
                       /* .catch(error => {
                            products_added = false;
                            notification.error({
                                message: 'LCHS Band Fundraising',
                                description:error.message || 'Sorry! Something went wrong!'
                            })
                        });
                }
                else {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:'Sorry! Something went wrong! Please try creating your order again.'
                    });
                    //redirect to other page
                }
                if (products_added === false) {
                    break;
                    //redirect to other page to attempt order again
                }
            }//end for
            if (products_added === true) {
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Your order has been placed!"
                });
                localStorage.removeItem('cart')
                this.props.history.push("/");
            }
        }.bind(this), 500)*/
    }

    render() {
        let info = JSON.parse(localStorage.getItem('cashOrderInfo'));
        let cart = JSON.parse(localStorage.getItem('cart'));
        const name  = "John Doe";
        const address = info["address"];
        const phone  = info["phone"];
        const email  = info["email"];
        
        
            
        return (
            <div className="order-review-conainer">
                <form align="center" onSubmit={this.handleSubmit}> 
                    <h1> Order Review </h1>
                    <h2> ( Please review that all the information is correct. ) </h2>
                    <br/>
                    <h3> Your Information: </h3>
                    <br/>
                    <div>
                        Name: { name }
                    </div>
                    <br/>
                    <div>
                        Phone: { phone }
                    </div>
                    <br/>
                        Address: { address }
                    <br/>
                    <br/>
                    <br/>
                    
                    <button class="center" onClick={ this.handleClick("/delivery-form") }> Go back </button> <br/>
                    <input type="submit" value="Continue" />

                </form>
            </div>

        );
    }
}

export default OrderReview;
