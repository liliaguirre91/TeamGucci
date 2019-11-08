//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { lookupOrder } from './util/APIFunctions'; //NEW NAME OF API FUNCTION
import './OrderLookup.css';
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
      this.handleSubmit = this.handleSubmit.bind(this);
   //this.loadUser = this.saveUser.bind(this);
  }

   handleIDChange(event) {
      this.setState({CampaignID: event.target.value});
   }

    
   handleSubmit(event) {
      event.preventDefault();
      /*const url = '/api/orders/search/'+ this.state.OrderID;
      fetch(url)
         .then(response => response.text())
         .then(result => this.setState({ result }));*/
      
      const campaignNumber = this.state.CampaignID;
      lookupOrder(campaignNumber)
      .then(result => 
         this.setState({ result })
       );
       
      
            
      setTimeout(function() {
         if (this.state.result == 'false')
            alert('campaign was not created/deleted');
         else if (this.state.result == 'true')
             alert('campaign was created/deleted');
         else
            alert(this.state.result);
      }.bind(this), 200)
      
      this.setState({ submitted: true });

      if (this.state.result == 'false')
         this.setState({ deliveryInfo: 'campaign was not created/deleted'});
      else if (this.state.result == 'true')
         this.setState({ deliveryInfo: 'campaign was created/deleted' });
      else
         this.setState({ deliveryInfo: this.state.result });
      
      
      
   }

   
   renderDeliveryInfo() {
      return <Campaign CampaignID={this.state.CampaignID}/>
   }
   
   render() {
      return (
         <div className="campaign-container">
            <h1 className="page-title"> Create/Delete a Campaign </h1>
            <h2 align="center"> Enter a campaign ID number: </h2>
                <Form className="campaign-form" align="center" onSubmit={this.handleSubmit}> 
                    <FormItem
                        label="Campaign Number">
                        <Input 
                            size="large"
                            type="text" 
                            autocomplete="off"
                            placeholder="campaign ID"
                            CampaignID={this.state.CampaignID} 
                            onChange={this.handleIDChange} maxLength="4"/>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-create-button">Create campaign</Button>
                    </FormItem>
                    <FormItem>
                         <Button type="primary"
                                htmlType="submit"
                                size="large"
                               className="campaign-form-delete-button">Delete campaign</Button>
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
  <Campaign />,
  document.getElementById('root')
);

export default Campaign;
