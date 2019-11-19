import React from 'react';
import ReactDOM from 'react-dom';
import { 
    Link, 
    withRouter, 
} from 'react-router-dom'

import './HomePage.css';

import { createOrder, createProductsOrdered } from './util/APIFunctions';
import {Form, Input, Button, notification, Result, Typography } from 'antd';
const {Text}=Typography;

class OrderConfirmation extends React.Component {
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
    }

    render() {     
        return (
            <div className="order-review-conainer">
                <Form align="center" onSubmit={this.handleSubmit}> 
                    <h1 class="title">Thank you for your purchase!</h1>
                    <h5><Text type="danger">PLEASE </Text>write down your confirmation number. Once this page is refreshed you will not be able to return.</h5>
             <Result
                status="success"
                //title="PLEASE write down your confirmation number. Once this page is refreshed you will not be able to return."
                subTitle="Your order confirmation number is:"
                    extra={[
                     <Button type="primary" onClick={this.handleClick("/")}>
                        Home
                     </Button>,
                    
                     ]}
             />
                </Form>
            </div>

        );
    }
}

export default OrderConfirmation;
