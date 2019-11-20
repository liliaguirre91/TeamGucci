import React, { Component } from 'react';
//import './ProductsOrdered.css';
import {countProducts, getProducts, getProduct} from '../../../util/APIFunctions';
import { Form, notification, Table } from 'antd';

//const FormItem = Form.Item;
const productIDs = [];
const productCounts = [];
const productNames = [];
const tableResults =[];
class ProductsOrdered extends Component {
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
    async componentDidMount() {
        
        //get the campaign number from local storage and set state.campaignID
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignNumber = setCampaign["year"];
        this.setState({campaignID: campaignNumber});
        
        //get all Products
        const response = await getProducts(campaignNumber) 
            .then(response => {
                this.setState({
                    getProductsResult: response
                })
            })

        //get the product IDs from the product table, store in productIDs[]
        for (var i = 0; i < this.state.getProductsResult.length; i++) {
            productIDs.push(this.state.getProductsResult[i].product_id);
        }

        for (var i = 0; i < productIDs.length; i++) {

            //send campaign # and the product ID # through API and get the count
            await countProducts(campaignNumber, productIDs[i])
                .then(response => {
                    this.setState({
                        productsOrderedQuantity: response
                    })
                })
                .catch(error => {
                    notification.error({
                        message: '',
                        description: error.message
                    });
                });
        
            //true if the product has been ordered on this campaign, store counts in productCounts[]
            if (this.state.productsOrderedQuantity > 0) {
                productCounts.push(this.state.productsOrderedQuantity);
            
                //get the product names 
                await getProduct(productIDs[i])
                    .then (response => {
                        this.setState({
                            positiveMatch: response
                        })
                    });

                productNames.push(this.state.positiveMatch.product);
            }//end if
        }//end for 
        
        //push all data to tableResults[]
        for (var i = 0; i < productNames.length; i++) {
            const item = { productID: productIDs[i], productName: productNames[i], quantity: productCounts[i]}
            tableResults.push(item);
        }
        this.setState()
    }//end componentDidMount

    render() {
        //table columns
        const columns = [
            {
                title: 'Product ID',
                dataIndex: 'productID',
                key: 'productID'
            },
            {
                title: 'Product Name',
                dataIndex: 'productName',
                key: 'productName'
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity'
            }
        ]
             return(
                <div classname = 'ProductsOrderedContainer'>
                    <h2 classname = 'Page Title'>Count the Products Ordered </h2>
                    <Table columns = {columns} dataSource = {tableResults} pagination = {false} size = 'middle' />
                   
                </div>
                
             );    
         } 
}//end ProductsOrdered class
  
export default ProductsOrdered;
