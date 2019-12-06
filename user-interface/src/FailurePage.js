/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: November 19, 2019
 * Description: The FailurePage class componet is used to inform a user about a failed order creation. It tells
 * the user that their attempt failed and directs them back to the home page
 * The main handlers/functions in this component are:
 *      - handleClick
 *      - handleSubmit
 *---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import './HomePage.css';
import {Button, Result } from 'antd';

class FailurePage extends React.Component {
    constructor(props) {
        super(props);
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
    * JSX/HTML components and their formatting. In this portion we define the result which indicates a failure
    *---------------------------------------------------------------------------------------------------------------------*/ 
    render() {     
        return (
            <div align = 'center' className="order-review-conainer">
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
            </div>
        );//end return
    }//end render
}//end FailurePage

export default FailurePage;
