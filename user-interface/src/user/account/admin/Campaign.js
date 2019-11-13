//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { createCampaign, deleteCampaign } from '../../../util/APIFunctions'; //NEW NAME OF API FUNCTION
import './Campaign.css';
import { Form, Input, Button, notification } from 'antd'
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
   //this.loadUser = this.saveUser.bind(this);
  }

   handleIDChange(event) {
      this.setState({CampaignID: event.target.value});
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
         if (this.state.result == 'false')
            alert('campaign was not created');
         else if (this.state.result == 'true')
             alert('campaign was created');
         else
            alert(this.state.result);
      }.bind(this), 200)
      
      /*this.setState({ submitted: true });

      if (this.state.result == 'false')
         this.setState({ deliveryInfo: 'campaign was not created/deleted'});
      else if (this.state.result == 'true')
         this.setState({ deliveryInfo: 'campaign was created/deleted' });
      else
         this.setState({ deliveryInfo: this.state.result });*/
      
      
      
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
         if (this.state.result == 'false')
            alert('campaign was not deleted');
         else if (this.state.result == 'true')
             alert('campaign was deleted');
         else
            alert(this.state.result);
      }.bind(this), 200)
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
                <Form className="campaign-form" align="center" onSubmit={this.handleSubmit}> 
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
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-create-button"
                               onClick={(e) => this.handleCreate(e) }>Create campaign</Button>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-delete-button"
                               onClick={(e) => this.handleDelete(e) }>Delete campaign</Button>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-earnings-button"
                               onClick={(e) => this.handleCreate(e) }>Revenue report</Button>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-addProduct-button"
                               onClick={(e) => this.handleCreate(e) }>Add a product</Button>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-delProduct-button"
                               onClick={(e) => this.handleCreate(e) }>Delete a product</Button>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-viewOrders-button"
                               onClick={(e) => this.handleCreate(e) }>View all orders</Button>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-viewProductsOrders-button"
                               onClick={(e) => this.handleCreate(e) }>Products ordered</Button>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-ordersDelivered-button"
                               onClick={(e) => this.handleCreate(e) }>Delivery report</Button>
                    </FormItem>
                </Form>
                {this.state.submitted}
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
