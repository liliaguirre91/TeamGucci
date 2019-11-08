import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { createOrder, createProductsOrdered } from '../util/APIFunctions';
import {Form, Input, Button, notification } from 'antd';
import "./PayPalPage.css";

class PayPalPage extends React.Component {
    render() {
        return (
            <div className="page-title">
                <h1 align="center"> Payment Page </h1>
                <h5 align="center"> Please enter your delivery information directly on the PayPal page</h5>
                <div className="paypal-button" align="center">
                    <PayPalButton
                        amount="0.01"
                        onSuccess={(details, data) => {
                            //alert("Transaction completed by " + JSON.stringify(details.purchase_units[0].shipping.address));
                
                            let user_id = -1;
                            var address = '';
                            const name  = JSON.stringify(details.purchase_units[0].shipping.name.full_name);
                            //const phone = this.state.phone.value;
                            const address_line_1 = details.purchase_units[0].shipping.address.address_line_1;

                            if (details.purchase_units[0].shipping.address.address_line_2 !== undefined)
                                address = address_line_1.concat( ' ', details.purchase_units[0].shipping.address.address_line_2);
                            else
                                address = address_line_1;
                            address = address.concat(' ', details.purchase_units[0].shipping.address.admin_area_2, 
                                                    ' ', details.purchase_units[0].shipping.address.admin_area_1, 
                                                    ' ', details.purchase_units[0].shipping.address.postal_code);
                            console.log(address)


                            
                            if(this.props.currentUser) {
                                let currentUser = this.props.currentUser;
                                user_id = currentUser.userId;
                                //console.log(user_id);
                            }  
                            
                            const orderInfo = {
                                address: address,
                                payment_type: 'paypal',
                                phone: 9999999999,
                                delivered: false,
                                camp: 19,
                                user_id: user_id
                            };

                            /* Call the createOrder function to create order in database */
                            /*createOrder(orderInfo)
                                .then((order_id) => this.setState({ order_id }))
                                .catch(error => {
                                    notification.error({
                                        message: 'LCHS Band Fundraising',
                                        description: error.message || 'Sorry! Something went wrong!'
                                    });
                                });
                            
                                
                            /*Implementing insertion of multiple products tied to one order number*/
                            /*setTimeout(function() {
                                const orderID = this.state.order_id;
                            
                                let cart = JSON.parse(localStorage.getItem('cart'));
                                //let productID = Object.keys(cart)[1];
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
                                        
                                    createProductsOrdered(productsOrdered)
                                        .then (response => {
                                            notification.success({
                                                message: 'LCHS Band Fundraising',
                                                description: "Your order has been placed!"
                                            });
                                            this.props.history.push("/paypal"); //for now will redirect to home, later to confirmation
                                        })
                                        .catch(error => {
                                            notification.error({
                                                message: 'LCHS Band Fundraising',
                                                description:error.message || 'Sorry! Something went wrong!'
                                            });
                                        });
                                }
                                
                                localStorage.removeItem('cart')
                            }.bind(this), 500)*/
                        }}
                        onError={(details, data) => {
                            alert("HELLO");
                        }}
                        options={{
                            clientId: "AVNKckm9ldJ3royPVTzmL7it6dXl0reDKlHjqI13rJ9oCoVRGXRH_KvResh4NYjDxNpdGsGJUD3Md2TI"
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default PayPalPage;
