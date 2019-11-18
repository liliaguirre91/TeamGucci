import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { createCampaign, deleteCampaign, orderCount, amountPaid, setCampaign } from '../../../util/APIFunctions'; //NEW NAME OF API FUNCTION
import './Campaign.css';
import { Form, Input, Button, Row, Col } from 'antd'
const FormItem= Form.Item;

class Campaign extends Component {
   constructor(props) {
      super(props);
      this.state = { 
         CampaignID: '',
         result: '',
         deliveryInfo:'',
         submitted: false
      };
      this.handleIDChange = this.handleIDChange.bind(this);    
      this.handleCreate = this.handleCreate.bind(this);  
      this.handleDelete = this.handleDelete.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleCount = this.handleCount.bind(this);
      this.handleEarnings = this.handleEarnings.bind(this);
      this.handleCurrent = this.handleCurrent.bind(this);
  }

    handleIDChange(event) {
        this.setState({CampaignID: event.target.value});
    }

    handleClick = param => e => {
        e.preventDefault();
        const setCampaign = { year: this.state.CampaignID };
        localStorage.setItem('setCampaign', JSON.stringify(setCampaign));
        console.log(localStorage.getItem('setCampaign'));
        this.props.history.push(param);
    }
    
   handleCreate(event) {
      event.preventDefault();
      /*const url = '/api/orders/search/'+ this.state.OrderID;
      fetch(url)
         .then(response => response.text())
         .then(result => this.setState({ result }));*/
      
        const campaignNumber = parseInt( this.state.CampaignID );
        const campaign = {
            yearRan: campaignNumber
        };      
        createCampaign(campaign)
            .then(result => 
            this.setState({ result })
        );
       
      
            
        setTimeout(function() {
            if (this.state.result === 'false')
                alert('campaign was not created');
            else if (this.state.result === 'true')
                alert('campaign was created');
            else
                alert(this.state.result);
        }.bind(this), 200)
      
     
      
      
   }
   handleDelete(event) {
      event.preventDefault();
      /*const url = '/api/orders/search/'+ this.state.OrderID;
      fetch(url)
         .then(response => response.text())
         .then(result => this.setState({ result }));*/
      
      const campaignNumber = parseInt( this.state.CampaignID );
      deleteCampaign(campaignNumber)
      .then(result => 
         this.setState({ result })
       );
       
      
            
      setTimeout(function() {
         if (this.state.result === 'false')
            alert('campaign was not deleted');
         else if (this.state.result === 'true')
             alert('campaign was deleted');
         else
            alert(this.state.result);
      }.bind(this), 200)
   }

   async handleCount( event ){
      const campaignNumber = parseInt( this.state.CampaignID );
      await orderCount(campaignNumber)
      .then(result => 
         this.setState({ result })
         );
      alert( this.state.result );
   }

   async handleEarnings( event ){
      const campaignNumber = parseInt( this.state.CampaignID );
      await amountPaid(campaignNumber)
      .then(result => 
         this.setState({ result })
         );
      alert( this.state.result );
   }
   async handleCurrent( event ){
      const campaignNumber = parseInt( this.state.CampaignID );
      await setCampaign(campaignNumber)
      .then(result => 
         this.setState({ result })
         );
      alert( "The current Campaign is " + this.state.result );
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
                     <Row gutter={[96, 10]} type = 'flex'>
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
                                    className="campaign-form-earnings-button"
                                    onClick={(e) => this.handleEarnings( e ) }>Revenue report</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="campaign-form-addProduct-button"
                                    onClick={this.handleClick("/add-product")}>Add a product</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="campaign-form-delProduct-button"
                                    onClick={this.handleClick("/delete-product")}>Delete a product</Button>
                           </FormItem>
                        </Col>
                        <Col span={8}>
                           <FormItem>
                              <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="campaign-form-viewOrders-button"
                                    onClick={(e) => this.handleCount(e) }>Count all orders</Button>
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
                                    className="campaign-form-ordersDelivered-button"
                                    onClick={this.handleClick("/delivery-report") }>Delivery Report</Button>
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
                     </Row>
                </Form>
         </div>
      );
   }
}

/*
               </Form>
                {this.state.submitted && this.renderDeliveryInfo()}
			 </div>

*/

ReactDOM.render(
  <Campaign/>,
  document.getElementById('root')
);

export default Campaign;
