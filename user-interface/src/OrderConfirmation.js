import React from 'react';
import './HomePage.css';

import { Form, Button, Result, Typography } from 'antd';
const {Text}=Typography;

class OrderConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  order_id: 0 };
        this.handleClick = this.handleClick.bind(this);
    }//end constructor

    handleClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
    };//end handleClick
    
    handleSubmit(event) {
        event.preventDefault();
        localStorage.removeItem('cart')
        this.props.history.push("/");
    };//end handleSubmit

    render() {
        const ohLord = localStorage.getItem('orderNumber');
        const yesLord = localStorage.getItem('campaign');
        const amen ='20' + yesLord + '-' + ohLord;

        return (
            <div className="order-review-conainer">
                <Form align="center" onSubmit={this.handleSubmit}> 
                    <h1 class="title">Thank you for your purchase!</h1>
                    <h5><Text type="danger">PLEASE </Text>write down your confirmation number. Once this page is refreshed you will not be able to return.</h5>
                   
             <Result
                status="success"
                subTitle="Above is your order confirmation number."
                title={amen}

                    extra={[
                     <Button onClick={this.handleClick("/")}>
                        Home
                     </Button>,
                    
                     ]}
             />
                </Form>
            </div>

        );//end return
    }//end render
}//end OrderConfirmation

export default OrderConfirmation;
