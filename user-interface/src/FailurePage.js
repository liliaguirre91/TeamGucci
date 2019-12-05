import React from 'react';
import './HomePage.css';
import {Button, Result } from 'antd';

class FailurePage extends React.Component {
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
        );//end return
    }//end render
}//end FailurePage

export default FailurePage;
