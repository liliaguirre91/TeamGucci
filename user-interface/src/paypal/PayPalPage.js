import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { createOrder, createProductsOrdered, getProduct } from '../util/APIFunctions';
import { notification, Table } from 'antd';
import "./PayPalPage.css";

class PayPalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    productName: "",
                    productPrice: 0,
                    total: 0,
                    products: []
        }
    }
    
    async componentDidMount() {
        
        let cart = JSON.parse(localStorage.getItem('cart'));
        
        if (localStorage.getItem('cart') !== null) {
            let cartSize = Object.keys(cart).length;
            let keys = Object.keys(cart);
            var tot = 0;
            const productNames = [];
            const productPrices = [];
            const productQuantities = [];
            const items = [];
            
            for (var i = 0; i < cartSize; i++) {
                    let productID = keys[i];
                    let quantity = cart[keys[i]];
                    await getProduct(productID)
                        .then (response => {
                            this.setState({
                                productName: response.product,
                                productPrice: response.price
                            });
                        })
                        .catch(error => {
                            notification.error({
                                message: 'LCHS Band Fundraising',
                                description:error.message || 'Sorry! Something went wrong!'
                            });
                        })
                   
                    productNames.push(this.state.productName);
                    productPrices.push("$" + this.state.productPrice.toString());
                    productQuantities.push(quantity);
                    tot += (this.state.productPrice * quantity);
            }
            
            for (var i = 0; i < productNames.length; i++) {
                const item = { product: productNames[i], price: productPrices[i], quantity: productQuantities[i] }
                items.push(item);
            }
            this.setState({ products: items })
            this.setState({ total: tot });
        }
    }
    
    render() {
        const columns = [
            {
                title: 'Product',
                dataIndex: 'product',
                key: 'product',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
            },    
        ];

        return (
            <div className="paypal-container">
                <h1 className="page-title"> Payment Page </h1>
                <h5 align="center"> Please enter your delivery information directly on the PayPal page</h5> <br/>
                <div className="paypal-summary">
                <Table 
                    dataSource={this.state.products} 
                    columns={columns} 
                    pagination={false}
                    footer={ () => 'Your total is: $' + this.state.total }
                />
                </div>
                <div className="paypal-button" align="center">
                    <PayPalButton
                        amount={ this.state.total }
                        onSuccess={(details, data) => {
                            let user_id = -1;
                            var address = '';
                            var order_created = true;
                            var products_added = true;
                            const name = details.purchase_units[0].shipping.name.full_name;
                            const address_line_1 = details.purchase_units[0].shipping.address.address_line_1;

                            if (details.purchase_units[0].shipping.address.address_line_2 !== undefined)
                                address = address_line_1.concat( ' ', details.purchase_units[0].shipping.address.address_line_2);
                            else
                                address = address_line_1;
                            
                            address = address.concat(' ', details.purchase_units[0].shipping.address.admin_area_2, 
                                                     ' ', details.purchase_units[0].shipping.address.admin_area_1, 
                                                     ' ', details.purchase_units[0].shipping.address.postal_code);
                            
                            if(this.props.currentUser) {
                                let currentUser = this.props.currentUser;
                                user_id = currentUser.userId;
                            }
                            
                            const phone = localStorage.getItem( 'Phone' );
                            localStorage.removeItem( 'Phone' );
                            const camp = localStorage.getItem( 'campaign' );
                            
                            const orderInfo = {
                                address: address,
                                payment: 'paypal',
                                phone: phone,
                                delivered: false,
                                camp: camp,
                                userId: user_id,
                                paid: this.state.total,
                                totalCost: this.state.total,
                                name: name
                            };
                            
                            localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
                            
                            /* Call the createOrder function to create order in database */
                            createOrder(orderInfo)
                                .then((orderId) => this.setState({ orderId }))
                                .catch(error => {
                                    order_created = false;
                                });
                                
                            /*Implementing insertion of multiple products tied to one order number*/
                            setTimeout(function() {
                                const orderID = this.state.orderId;
                            
                                let cart = JSON.parse(localStorage.getItem('cart'));
                                let cartSize = Object.keys(cart).length;
                                let keys = Object.keys(cart); 
                                
                                for (var i = 0; i < cartSize; i++) {
                                    let productID = keys[i];
                                    let quantity = cart[keys[i]];
                                    const productsOrdered = {
                                        orderId: parseInt(orderID, 10),
                                        productId: productID,
                                        quantity: quantity
                                    };
                                    
                                    if (order_created === true) {
                                        createProductsOrdered(productsOrdered)
                                            .catch(error => {
                                                products_added = false;
                                                notification.error({
                                                    message: 'LCHS Band Fundraising',
                                                    description:error.message || 'Sorry! Something went wrong!'
                                                })
                                            });
                                    }
                                    else {
                                        products_added = false;
                                    }
                                    
                                    if (products_added === false) {
                                        this.props.history.push("/failure-page");
                                        break;
                                    }
                                }//end for
                                
                                if (products_added === true) {
                                    notification.success({
                                        message: 'LCHS Band Fundraising',
                                        description: 'Your order has been placed!'
                                    });
                                    localStorage.removeItem('cart')
                                    localStorage.setItem('orderNumber', this.state.orderId);
                                    console.log(localStorage.getItem('orderNumber'));
                                    this.props.history.push('/order-confirmation');
                                }
                            }.bind(this), 500)
                        }}
                        onError={(details, data) => {
                            notification.error({
                                message: 'LCHS Band Fundraising',
                                description: 'Something went wrong! Please try make your payment again!'
                            })
                        }}
                        options={{
                            clientId: 'AVNKckm9ldJ3royPVTzmL7it6dXl0reDKlHjqI13rJ9oCoVRGXRH_KvResh4NYjDxNpdGsGJUD3Md2TI'
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default PayPalPage;
