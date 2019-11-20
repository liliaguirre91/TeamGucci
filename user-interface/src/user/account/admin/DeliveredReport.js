//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { 
    getOrdersDelivered, 
    getProductsOrdered, 
    getProduct, 
    getProducts, 
    setToDelivered } from '../../../util/APIFunctions';

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


class DeliveredReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantity: 0,
            productID: 0,
            orders: '',
            productTmp: '',
            productName: "",
            items: '',
            orderNumber: 0,
            selectedRowKeys: [],
            loading: false,
        }
    }
    
/*******************************************************************************************/  
    async componentDidMount() {
        var productQuantities= [];
        var product= [];
        const allProducts = [];
        var data = [];
        const products = []
        //var orders = [];
        await getProducts( )
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
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"]
        //console.log("hello" + campaignYear);
        const response = await getOrdersDelivered(campaignYear)
            .then (response => {
                this.setState({
                    orders: response
                });
                const orders = this.state.orders;
                for (var i = 0; i < orders.length; i++) {
                    //console.log("total cost:" + orders[i].totalCost)
                    if (orders[i].totalCost != undefined) 
                        this.state.orders[i].totalCost = "$" + orders[i].totalCost.toString() + ".00";
                    if (orders[i].paid != undefined)
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

  
/*******************************************************************************************/  
    getOrderedProducts(x)  {
        console.log(x);
        
        const orders = this.state.orders;
        
        const columns = [
        { title: 'Product ID', dataIndex: 'productID', key: 'productID' },
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        ];

        const products = this.state.items;
        const data = products[x];
        return <Table rowKey="productID" columns={columns} dataSource={data} pagination={false} />
    }
    
    
/*******************************************************************************************/      
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
                <h1 className="page-title">Orders Report</h1>
                <div style={{ marginBottom: 16 }}>
                    <Table 
                        dataSource={this.state.orders} 
                        columns={columns} 
                        rowKey={(record) => record.orderId}
                        expandedRowRender={(record, i) =>
                            this.getOrderedProducts(i)}
                            
                        bordered
                        pagination={false}
                        scroll={{ y: 600 }}
                    />
                </div>
            </div>
        );
    }
}



export default DeliveredReport;
