import React, { Component } from 'react';
import { countProducts, getProducts, getProduct, countProductsLeft } from '../../../util/APIFunctions';
import { notification, Table } from 'antd';

const productIDs = [];
const productCounts = [];
const productLeft = [];
const productNames = [];
const tableResults =[];
class ProductsOrdered extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           CampaignID: '',
           submitted: false,
           productsOrderedQuantity: '',
           productsOrderedLeftQuantity: '',
           getProductsResult: '',
           positiveMatch: '',
           fillTable: []
        };
    }//end constructor
    async componentDidMount() {
        
        //get the campaign number from local storage and set state.campaignID
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignNumber = setCampaign["year"];
        
        //get all Products from the campaign specified
        const response = await getProducts(campaignNumber) 
            .then(response => {
                this.setState({
                    getProductsResult: response
                })
            })

        //get the product IDs from the product table, store in productIDs[]
        for (var i = 0; i < this.state.getProductsResult.length; i++) {
            productIDs.push(this.state.getProductsResult[i].productId);
        }

        for (var i = 0; i < productIDs.length; i++) {

            //send campaign # and the product ID # through API and get the count
            await countProducts( productIDs[i] )
                .then(response => {
                    this.setState({
                        productsOrderedQuantity: response
                    })
                })
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description: error.message
                    });
                });
                
                await countProductsLeft( campaignNumber, productIDs[i] )
                .then(response => {
                    this.setState({
                        productsOrderedLeftQuantity: response
                    })
                })
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description: error.message
                    });
                });
                if (this.state.productsOrderedLeftQuantity > 0) {
                    productLeft.push(this.state.productsOrderedLeftQuantity);
                }//end if
                
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
            const item = { productID: productIDs[i], productName: productNames[i], quantity: productCounts[i], left: productLeft[ i ]}
            tableResults.push(item);
        }//end for

        this.setState({fillTable: tableResults});
        productCounts.length = 0;
        productNames.length = 0;
        productIDs.length = 0;
        tableResults.length = 0;

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
                title: 'Total Ordered',
                dataIndex: 'quantity',
                key: 'quantity'
            },
            {
                title: 'Not Delivered',
                dataIndex: 'left',
                key: 'left'
            }
        ]
             return(
                <div classname = 'ProductsOrderedContainer'>
                    <h1 classname='Space Filler' >Count the Products Ordered </h1>
                    <h2 classname = 'Page Title' align="center">Count the Products Ordered</h2>
                    <Table columns = {columns} dataSource = {this.state.fillTable} bordered pagination = {false} size = 'middle' />
                   
                </div>
                
             );
             
         } 
        
}//end ProductsOrdered class
  
export default ProductsOrdered;
