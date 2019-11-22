//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { getPreviousOrders, getProductsOrdered, getProduct, getAllProducts } from '../../../util/APIFunctions';
import {
    Form, 
    Input, 
    Button, 
    notification, 
    Table, 
    Badge, 
    Menu, 
    Dropdown, 
    Icon } from 'antd';


class CustomerOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantity: 0,
            productID: 0,
            orders: '',
            productTmp: '',
            productName: "",
            //product: null,
            items: null,
            orderNumber: 0
        }
    }
    
  
    async componentDidMount() {
        var productQuantities= [];
        var product= [];
        const allProducts = [];
        var data = [];
        const products = []
        //var orders = [];
        await getAllProducts( )
            .then( response => {
                this.setState( {
                    productTmp: response
                });
             } )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            })
        const idk = this.state.productTmp;
        console.log( idk );
        for( var i = 0; i < idk.length; i++ ){
            allProducts[ idk[i].productId ] = idk[i].product
        }
        console.log( allProducts );
        //let user = JSON.parse(localStorage.getItem('this.currentUser'));
        //let campaignYear = setCampaign["year"]
        //console.log("hello" + campaignYear);
        let user_id = 0;

        if(this.props.currentUser){
            let currentUser = this.props.currentUser;
            user_id = currentUser.userId;
            console.log(user_id);
        }
        const response = await getPreviousOrders(user_id)
            .then (response => {
                this.setState({
                    orders: response
                });
                const orders = this.state.orders;
                for (var i = 0; i < orders.length; i++) {
                    //console.log("total cost:" + orders[i].totalCost)
                    this.state.orders[i].totalCost = "$" + orders[i].totalCost.toString() + ".00";
                    this.state.orders[i].paid = "$" + orders[i].paid.toString() + ".00";
                    //console.log("total cost:" + this.state.orders[i].totalCost);
                }
                console.log("Orders:" + JSON.stringify(this.state.orders));
                //orders = this.state.orders;
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            })
        
        const orders = this.state.orders;
        //console.log(orders[0].orderId);
        for (var i = 0; i < orders.length; i++) {
            const productResponse = await getProductsOrdered(orders[i].orderId) 
                .then (productResponse => {
                    const length = productResponse.length;
                    for (var i = 0; i < length; i++) {
                        //do the api call to get product with productid
                        const item = { productID: productResponse[i].productId, name: allProducts[productResponse[i].productId], quantity: productResponse[i].quantity };
                        console.log(orders[i].orderId, item);
                        data.push(item);
                        console.log(data);

                    }
                     products.push(data);
                     data = [];
                })
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:error.message || 'Sorry! Something went wrong!'
                    });
                })
        }
        
       
        //console.log(data);
        this.setState({items: products});
        console.log(this.state.items);
    }
    
    getOrderedProducts(x)  {
        console.log(x);
        //const productQuantities= [];
        //const productIDs= [];
        const orders = this.state.orders;
        
        const columns = [
        { title: 'Product ID', dataIndex: 'productID', key: 'productID' },
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        //{ title: 'Product Name', dataIndex: 'product', key: 'product' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        ];

        const products = this.state.items;
        const data = products[x];
        return <Table columns={columns} dataSource={data} pagination={false} />
    }
    
    handleClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
     }  
    
    render() {
        const columns = [
            {
                title: 'Order Number',
                dataIndex: 'orderId',
                key: 'orderId',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Phone Number',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
            {
                title: 'Amount Paid',
                dataIndex: 'paid',
                key: 'paid',
            },
            {
                title: 'Total Cost',
                dataIndex: 'totalCost',
                key: 'totalCost',
            },
        ];
    
        return (

            <div className="delivery-report-container">
                <h1 className="page-title">My Orders</h1>
                <Button type="primary"
                htmlType="submit"
                size="large"
                className="customer-back-button"
                onClick={this.handleClick("/user-account")}>Back</Button>
                
                <Table 
                
                    dataSource={this.state.orders} 
                    columns={columns} 
                    rowKey={(record) => record.id}
                    expandedRowRender={(record, i) =>
                        this.getOrderedProducts(i)} 
                    bordered
                    pagination={false}
                    
                />
            </div>
        );
    }
}



export default CustomerOrder;
