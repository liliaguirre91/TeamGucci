import React from 'react';
import ReactDOM from 'react-dom';
import { 
    Link, 
    withRouter, 
} from 'react-router-dom'

import './HomePage.css';

import { createOrder, createProductsOrdered } from './util/APIFunctions';
import {Form, Input, Button, notification, Result, Paragraph, Text, Icon } from 'antd';

class FailurePage extends React.Component {
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
                <form align="center" onSubmit={this.handleSubmit}> 
                    <h1 class="title">UH OH!</h1>
                    <h4> something went wrong! </h4>
                    <Result
                        status="error"
                        title="Submission Failed"
                        subTitle="Please return to the home page and try again."
                            extra={[
                                <Button type="primary" onClick={ this.handleClick("/") }>
                                 Home
                                </Button>,
                                    ]}
                    >
                    </Result>
                </form>
            </div>

        );
    }
}

export default FailurePage;
