//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { getOrdersNotDelivered, getProduct } from '../../../util/APIFunctions';
import {Form, Input, Button, notification, Table } from 'antd';


class DeliveryReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productOrdered: null,
            productName: "",
            orderNumber: 0
        }
    }
    
   
    async componentDidMount() {
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"]
        console.log("hello" + campaignYear);
        /*const response = await getOrdersNotDelivered()
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
                    })*/
    }
    
    render() {
        /*const columns = [
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
        ];*/
    
        return (
            <div className="delivery-report-container">
                <h1 className="page-title">Order LoOkup</h1>
                <h2 align="center"> Enter your order ID number: </h2>
                <h3 align="center"> (It is the number from your confirmation page) </h3>
            </div>
        );
    }
}

export default DeliveryReport;
