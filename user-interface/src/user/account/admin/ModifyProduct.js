import React, { Component } from 'react';
import { getProducts } from '../../../util/APIFunctions';
import { Form, notification, Table, Modal } from 'antd';
const FormItem = Form.Item;


class ModifyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           CampaignID: '',
           submitted: false,
           productsOrderedQuantity: '',
           getProductsResult: '',
           positiveMatch: ''
        };
    }//end constructor
}
