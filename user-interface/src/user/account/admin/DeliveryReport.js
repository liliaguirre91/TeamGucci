//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { getOrdersNotDelivered, getProductsOrdered, getProduct } from '../../../util/APIFunctions';
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


class DeliveryReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantity: 0,
            productID: 0,
            orders: '',
            productName: "",
            //product: null,
            items: null,
            orderNumber: 0
        }
    }
    
  
    async componentDidMount() {
        var productQuantities= [];
        var productIDs= [];
        var data = [];
        const products = []
        //var orders = [];
        
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"]
        //console.log("hello" + campaignYear);
        const response = await getOrdersNotDelivered(campaignYear)
            .then (response => {
                this.setState({
                    orders: response
                });
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
                        this.setState({
                            productQuantity: productResponse[i].quantity,
                            productID: productResponse[i].productId
                        });
                        //do the api call to get product with productid
                        const item = { productID: this.state.productID, quantity: this.state.productQuantity };
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
        //{ title: 'Product Name', dataIndex: 'product', key: 'product' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        ];

        
        /*const data = [];
        for (var i = 0; i < productIDs; i++) {
            const item = { productID: productIDs[i], quantity: productQuantities[i] }
                console.log(item);
                data.push(item);
        }*/
        
        
        /*for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                productID: '2014-12-24 23:12:00',
                product: 'This is production name',
                quantity: 'Upgraded: 56',
            });
        }*/
        //console
        //this.setState({loaded: true});
        const products = this.state.items;
        const data = products[x];
        return <Table columns={columns} dataSource={data} pagination={false} />
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
        ];
    
        return (
            <div className="delivery-report-container">
                <h1 className="page-title">Delivery Report</h1>
                <Table 
                    dataSource={this.state.orders} 
                    columns={columns} 
                    rowKey={(record: any) => record.id}
                    expandedRowRender={(record, i) =>
                        this.getOrderedProducts(i)}
                        
                    bordered
                    pagination={true}
                    
                />
            </div>
        );
    }
}



export default DeliveryReport;
