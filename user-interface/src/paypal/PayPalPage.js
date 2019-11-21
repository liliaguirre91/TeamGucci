import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { createOrder, createProductsOrdered, getProduct } from '../util/APIFunctions';
import { notification, Table, message } from 'antd';
import "./PayPalPage.css";


//const items = [];
//var total = 0;
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
        console.log(cart);
        if (localStorage.getItem('cart') === null) {
            message.error('Your cart is empty!! Cannot continue!!', 7);
        }
        else {
            let cartSize = Object.keys(cart).length;
            let keys = Object.keys(cart);
            var tot = 0;
            const productNames = [];
            const productPrices = [];
            const productQuantities = [];
            const product = {};
            const items = [];
            
            
            for (var i = 0; i < cartSize; i++) {
                    let productID = keys[i];
                    let quantity = cart[keys[i]];
                    const response = await getProduct(productID)
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
                console.log(item);
                items.push(item);
            }
            this.setState({ products: items })
            console.log(items)
            this.setState({ total: tot });
            //console.log(product);
            //console.log(productNames, productPrices, productQuantities, this.state.total);
            
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
                            //alert("Transaction completed by " + JSON.stringify(details.purchase_units[0].shipping.address));
                
                            let user_id = -1;
                            var address = '';
                            var order_created = true;
                            var products_added = true;
                            const name = details.purchase_units[0].shipping.name.full_name;
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
                                console.log(user_id);
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
                            //let info = JSON.parse(localStorage.getItem('orderInfo'));
                            //console.log(info);
                            
                            /* Call the createOrder function to create order in database */
                            createOrder(orderInfo)
                                .then((orderId) => this.setState({ orderId }))
                                .catch(error => {
                                    order_created = false;
                                });
                                console.log(this.state.orderId);

                                
                            /*Implementing insertion of multiple products tied to one order number*/
                            setTimeout(function() {
                                const orderID = this.state.orderId;
                            
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
                                            .catch(error => {
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
                                        products_added = false;
                                        //redirect to other page
                                    }
                                    if (products_added === false) {
                                        break;
                                        //remove order and redirect to other page to attempt order again
                                    }
                                }//end for
                                if (products_added === true) {
                                    notification.success({
                                                    message: 'LCHS Band Fundraising',
                                                    description: "Your order has been placed!"
                                                });
                                    localStorage.removeItem('cart')
                                    localStorage.setItem('orderNumber', this.state.orderId);
                                    console.log(localStorage.getItem('orderNumber'));
                                    this.props.history.push("/order-confirmation");
                                }
                            }.bind(this), 500)
                        }}
                        onError={(details, data) => {
                            alert("Something went wrong! Please try make your payment again!");
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
