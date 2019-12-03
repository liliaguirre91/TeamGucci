import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { 
    createCampaign,
    deleteCampaign, 
    orderCount, 
    amountPaid, 
    setCampaign,
    getTotalCost } from '../../../util/APIFunctions'; 
    
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

    handleIDChange(event) {
        this.setState({CampaignID: event.target.value});
    }

    handleClick = param => e => {
        e.preventDefault();
        const setCampaign = { year: this.state.CampaignID };
        if (this.state.CampaignID !== '') {
            localStorage.setItem('setCampaign', JSON.stringify(setCampaign));
            console.log(localStorage.getItem('setCampaign'));
            this.props.history.push(param);
        }
        else {
            message.error('Please enter a campaign number!!', 5);
        }
    }

    handleBackClick = param => e => {
      e.preventDefault();
      this.props.history.push(param);
   }


   setEarning( b ){
      this.setState( { earnings: b } );
   }
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
   async handleDelete(event) {
      event.preventDefault();
      
      const campaignNumber = parseInt( this.state.CampaignID );
      if( this.state.submitted === false ){
         notification.success({
            message: 'LCHS Band Fundraising',
            description: "Please click again to confirm"
        });
        this.setState( { submitted: true } );
      }
      else{ 
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
   }

    renderCampaignInfo() {
        return <Campaign CampaignID={this.state.CampaignID}/>
    }
   
    handleSubmit( event ){
        alert( "Please Press a Button")
    }
   
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
                  onCancel={ () => this.setEarning( false ) }
               >
                  <p>The amount of money earned in this campaign is ${this.state.amount}</p>
                  <p>The amount of money owed in this campaign is ${this.state.owed}</p>
                  <p>The amount of orders made in this campaign is {this.state.orders}</p>
               </Modal>
               <br />
               <br />
               <Form className="campaign-form" align="center" layout = 'inline'> 
                  <FormItem
                           label="">
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
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="campaign-form-create-button"
                                    onClick={(e) => this.handleCreate(e) }>Create campaign</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}> 
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="campaign-form-delete-button"
                                    onClick={(e) => this.handleDelete(e) }>Delete campaign</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="row2-button"
                                    onClick={(e) => this.handleEarnings( e ) }>Revenue report</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button 
                                 type="primary"
                                 htmlType="submit"
                                 size="large"
                                 className="row3-button"
                                 onClick={this.handleClick("/add-product")}>Add a product</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="campaign-form-delProduct-button"
                                    onClick={this.handleClick("/modify-product")}>Modify a product</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}> 
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="campaign-form-viewProductsOrders-button"
                                    onClick={this.handleClick("/products-ordered") }>Products ordered</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="row4-button"
                                    onClick={this.handleClick("/delivery-report") }>Delivery Report</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="row4-button"
                                    onClick={this.handleClick("/orders-report") }>Orders Report</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="campaign-form-setCampaign-button"
                                    onClick={(e) => this.handleCurrent( e ) }>Set Current Campaign</Button>
                           </FormItem>
                        </Col>
                        <Col span={24}>
                        <FormItem>
                            <Button
                                htmlType="button"
                                size="large"
                                className="back-button"
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
