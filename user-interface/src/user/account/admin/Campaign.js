/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created:
 * Description: The Campaign class component renders a set of buttons that can be used to configure the campaign
 * specified in the provided input. In this page the admin can directly create, set and delete (only root) the specified
 * campaign. Here the admin can also generate a short revenue and orders summary. The main handlers/function s in this
 * component are:
 *      - handleIDChange
 *      - handleClick
 *      - handleBackCLick
 *      - setEarning
 *      - handleCreate
 *      - handleDelete
 *      - handleCurrent
 *      - handleEarnings
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { createCampaign, deleteCampaign, orderCount, 
         amountPaid, setCampaign, getTotalCost } from '../../../util/APIFunctions'; 
import './Campaign.css';
import { Form, Input, Button, Row, Col, notification, Modal, message } from 'antd'
const FormItem= Form.Item;

class Campaign extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            CampaignID: '',
            result: '',
            earnings: false,
            deliveryInfo:'',
            submitted: false,
            amount: 0,
            owed: 0,
            orders: 0
        };
      
        this.handleIDChange = this.handleIDChange.bind(this);    
        this.handleCreate = this.handleCreate.bind(this);  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEarnings = this.handleEarnings.bind(this);
        this.handleCurrent = this.handleCurrent.bind(this);
        this.setEarning = this.setEarning.bind(this);
   }

   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleIDChange hanges the changing of the campaign ID number.
    *--------------------------------------------------------------------------------------------------------------------*/ 
    handleIDChange(event) {
        this.setState({CampaignID: event.target.value});
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleClick handles the redirection of the user to a different page. It takes a parameter
    * of the page they are being redirected to. It store the user input in local storage.
    * It also catches the error of when the user clicks a button but no integer is entered. 
    *---------------------------------------------------------------------------------------------------------------------*/
    handleClick = param => e => {
        e.preventDefault();
        const setCampaign = { year: this.state.CampaignID };
        if (this.state.CampaignID !== '') {
            localStorage.setItem('setCampaign', JSON.stringify(setCampaign));
            this.props.history.push(param);
        }
        else {
            message.error('Please enter a campaign number!!', 5);
        }
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleBackCLick handles the user pressing the back button 
    *---------------------------------------------------------------------------------------------------------------------*/
    handleBackClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: setEarning handles whether the modal is visible or not by changing from false to true.
    *---------------------------------------------------------------------------------------------------------------------*/
    setEarning( b ){
        this.setState( { earnings: b } );
    }


   /*---------------------------------------------------------------------------------------------------------------------
    * Function: handleCreate creates a new campagin specified by the user.
    * It calls the API function createCampaign the takes an input value and creates a new campaign
    * It also catches creation errors, and notifies the user. 
    *---------------------------------------------------------------------------------------------------------------------*/
    async handleCreate(event) {
        event.preventDefault();
      
        const campaignNumber = parseInt( this.state.CampaignID );
        const campaign = {
            yearRan: campaignNumber
        };      
        
        await createCampaign(campaign)
            .then(result => 
                this.setState({ result }),
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Your created a new campaign!"
                  
                })
            )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });  
    }
    
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Function: handleDelete deletes a campaign specified by the user.
    * It calls the API function deleteCampaign that takes input from the user and deletes the campaign.
    * It then prompts the user to confrim their choice of deletion. It also catches errors and notifies
    * the user. 
    *---------------------------------------------------------------------------------------------------------------------*/ 
    async handleDelete(event) {
        event.preventDefault();
        let user_role = '';
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            user_role = currentUser.role;
        }
        
        if (user_role === 'Role_ROOT') {
            const campaignNumber = parseInt( this.state.CampaignID );
            if( this.state.submitted === false ){
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Please click again to confirm"
                });
                this.setState( { submitted: true } );
            }
            else { 
                await deleteCampaign(campaignNumber)
                    .then(result => 
                        this.setState({ result }),
                        notification.success({
                            message: 'LCHS Band Fundraising',
                            description: "You successfully deleted a campaign"
                        })
                    )
                    .catch(error => {
                        notification.error({
                            message: 'LCHS Band Fundraising',
                            description:error.message || 'Sorry! Something went wrong!'
                        });
                    });
                this.setState( { submitted: false } );
            }
        }
        else {
            notification.error({
                message: 'LCHS Band Fundraising',
                description: 'You must be GOD (admin) to do this!'
            });
        }
    }
    
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Function: handleEarnings calls to the API functions getTotalCost, amountPaid and orderCount
    * these funtions return numerical values when the user presses the "revenue report" button.
    * It also catches errors and notifies the user when something goes wrong.
    *---------------------------------------------------------------------------------------------------------------------*/
    async handleEarnings( event ){
        const campaignNumber = parseInt( this.state.CampaignID );
        
        await getTotalCost(campaignNumber)
            .then(result => 
                this.setState( { owed: result } )
            )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
        
        await amountPaid(campaignNumber)
            .then(result => 
                this.setState( { amount: result } )
            )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
        
        await orderCount(campaignNumber)
            .then(result => 
                this.setState( { orders: result } ),
                this.setState( { earnings: true } )
            )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
    }
    
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Function: handleCurrent sets the current campaign specified by the user. It calls the API function
    * setCampaign, is given the campaign number as a parameter and sets the input as the current campaign.
    *---------------------------------------------------------------------------------------------------------------------*/
    async handleCurrent( event ){
        const campaignNumber = parseInt( this.state.CampaignID );
        await setCampaign(campaignNumber)
            .then(result => 
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "The current Campaign is " + result
                })
            )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
        
        setTimeout( function( ) {
            window.location.reload();
        }.bind( this ), 1000 );
    }
   
   /*---------------------------------------------------------------------------------------------------------------------
    * The campaign page expects the user to input a two-digit integer then allows them
    * to select one of the buttons on the page. The buttons will not function properly
    * if there is not input. We expect the user to input the correctly formatted input
    * of a two-digit integer. 
    * 
    * A modal is in place when the user requests the revenue report. A pop-up window will
    * appear that the user can then click away from.
    * 
    * All of the buttons in the render() have the following attributtes:
    *    - style: allows for a border color to be applied
    *    - htmlType: expresses the type of button functionality
    *    - size: make the text larger on screen
    *    - onClick: a function defined above
    * The buttons were also separated with a row gutter and col span.
    *---------------------------------------------------------------------------------------------------------------------*/
    render() {
        return (
            <div className="campaign-container">
                <h2 className="page-title"> Campaign Configuration </h2>
                <h5 align="center"> Enter a campaign ID number: </h5>
                <Modal
                    title="Amount Earned"
                    centered
                    destroyOnClose={true}
                    visible={ this.state.earnings }
                    onOk={ () => this.setEarning( false ) }
                    onCancel={ () => this.setEarning( false ) }>
                        <p>The amount of money earned in this campaign is ${this.state.amount}</p>
                        <p>The amount of money owed in this campaign is ${this.state.owed}</p>
                        <p>The amount of orders made in this campaign is {this.state.orders}</p>
                </Modal>
                <br /><br />
                <Form className="campaign-form" align="center" layout = 'inline'> 
                    <FormItem label="">
                        <Input 
                            size="large"
                            type="text" 
                            pattern="^[0-9]*$"
                            autocomplete="off"
                            placeholder="campaign ID"
                            CampaignID={this.state.CampaignID} 
                            onChange={this.handleIDChange} maxLength="2"/>
                    </FormItem>
                    <div className="campaign-container2">
                        <Row gutter={[100, 40]} type = 'flex'>
                            <Col span={8}>
                                <FormItem>
                                    <Button 
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={(e) => this.handleCreate(e) }>Create campaign</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}> 
                                <FormItem>
                                    <Button
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={(e) => this.handleDelete(e) }>Delete campaign</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Button 
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={(e) => this.handleCurrent( e ) }>Set Current Campaign</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Button 
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={this.handleClick("/add-product")}>Add a product</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Button 
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={this.handleClick("/modify-product")}>Modify a product</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}> 
                                <FormItem>
                                    <Button 
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={this.handleClick("/products-ordered") }>Products ordered</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Button 
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={this.handleClick("/delivery-report") }>Delivery Report</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Button 
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={this.handleClick("/orders-report") }>Orders Report</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Button 
                                        style={{ borderColor:"#597ef7"}}
                                        htmlType="submit"
                                        size="large"
                                        onClick={(e) => this.handleEarnings( e ) }>Revenue report</Button>
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem>
                                    <Button
                                        style={{ borderColor:"#f5222d"}}
                                        htmlType="button"
                                        size="large"
                                        onClick={ this.handleBackClick("/admin-account")}> Back </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        );
   }
}

ReactDOM.render(
  <Campaign/>,
  document.getElementById('root')
);
export default Campaign;
