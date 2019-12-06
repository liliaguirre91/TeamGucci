/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: November 21, 2019
 * Description: The OrderConfirmation class component is an information display page which shows a user that
 * they successfully placed an order as well as informs them of the number assigned to their order.
 * The main handlers/functions in this component are:
 *      - handleClick
 *---------------------------------------------------------------------------------------------------------------------*/
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

    /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleClick will handle the action of the home button. If the home button is clicked, the user will be
    * redirected to the home page. 
    *---------------------------------------------------------------------------------------------------------------------*/
    handleClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
    };//end handleClick

    /*---------------------------------------------------------------------------------------------------------------------
    * Function: render takes care of rendering all component elements to the screen. Then the return includes all 
    * JSX/HTML components and their formatting. In this portion we define the result which confirms the order
    *---------------------------------------------------------------------------------------------------------------------*/ 
    render() {
        const ohLord = localStorage.getItem('orderNumber');
        const yesLord = localStorage.getItem('campaign');
        const amen ='20' + yesLord + '-' + ohLord;

        return (
            <div className="order-review-conainer">
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
            </div>

        );//end return
    }//end render
}//end OrderConfirmation

export default OrderConfirmation;
