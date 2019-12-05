//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { 
    getOrders, 
    getProductsOrdered,
    getProducts,
    setPaid } from '../../../util/APIFunctions';

import {
    Form, 
    Input, 
    Button, 
    notification, 
    Table,
    Modal, 
    Badge, 
    Menu, 
    Dropdown, 
    Icon } from 'antd';


const FormItem= Form.Item;
class OrdersReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantity: 0,
            productID: 0,
            orderId: 0,
            amount: 0,
            orders: '',
            visable: false,
            productTmp: '',
            productName: "",
            items: '',
            orderNumber: 0,
            selectedRowKeys: [],
            loading: false,
        }
    }
    
/*******************************************************************************************/  
    async componentDidMount() {
        var productQuantities= [];
        var product= [];
        const allProducts = [];
        var data = [];
        const products = []
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"]
        console.log("hello " + campaignYear);
        await getProducts(campaignYear)
            .then( response => {
                this.setState( {
                    productTmp: response
                });
             } )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            })
        const idk = this.state.productTmp;
        console.log( idk );
        for( var i = 0; i < idk.length; i++ ){
            allProducts[ idk[i].productId ] = idk[i].product
        }
        console.log( allProducts );
        console.log("hello 2 " + campaignYear);
        const response = await getOrders(campaignYear)
            .then (response => {
                this.setState({
                    orders: response
                });
                const orders = this.state.orders;
                for (var i = 0; i < orders.length; i++) {
                    //console.log("total cost:" + orders[i].totalCost)
                    if (orders[i].totalCost != undefined) 
                        this.state.orders[i].totalCost = "$" + orders[i].totalCost.toString() + ".00";
                    if (orders[i].paid != undefined)
                        this.state.orders[i].paid = "$" + orders[i].paid.toString() + ".00";
                    
                    //console.log("total cost:" + this.state.orders[i].totalCost);
                }
                console.log("Orders:" + JSON.stringify(this.state.orders));
                //orders = this.state.orders;
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            })
        
        const orders = this.state.orders;
        //console.log(orders[0].orderId);
        for (var i = 0; i < orders.length; i++) {
            const productResponse = await getProductsOrdered(orders[i].orderId) 
                .then (productResponse => {
                    const length = productResponse.length;
                    for (var i = 0; i < length; i++) {
                        //do the api call to get product with productid
                        const item = { productID: productResponse[i].productId, name: allProducts[productResponse[i].productId], quantity: productResponse[i].quantity };
                        console.log(orders[i].orderId, item);
                        data.push(item);
                        console.log(data);

                    }
                     products.push(data);
                     data = [];
                })
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:error.message || 'Sorry! Something went wrong!'
                    });
                })
        }
        
       
        //console.log(data);
        this.setState({items: products});
        console.log(this.state.items);
    }

  
/*******************************************************************************************/  
    getOrderedProducts(x)  {
        console.log(x);
        
        const orders = this.state.orders;
        
        const columns = [
        { title: 'Product ID', dataIndex: 'productID', key: 'productID' },
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        ];

        const products = this.state.items;
        const data = products[x];
        return <Table rowKey="productID" columns={columns} dataSource={data} pagination={false} />
    }

    setVisable( vis, orderId ){
        this.setState( { visable: vis } );
        this.setState( { orderId: orderId } );
    }

    async handlePaid( vis ){
        const o = this.state.orderId;
        const p = this.state.amount;
        await setPaid( o, p )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
        this.setState( { visable: vis } );
    }
    
  handlePaidChange(event) {
    this.setState({ amount: event.target.value});
  }


  handleBackClick = param => e => {
    e.preventDefault();
    this.props.history.push(param);
 }
    
    
/*******************************************************************************************/      
    render() {
        const columns = [
            {
                title: 'Order Number',
                dataIndex: 'orderId',
                key: 'orderId',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Phone Number',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
            {
                title: 'Amount Paid',
                dataIndex: 'paid',
                key: 'paid',
            },
            {
                title: 'Total Cost',
                dataIndex: 'totalCost',
                key: 'totalCost',
            },
            {
              title: 'Change Amount Paid',
              key: 'action',
              render: (text, record) =>
                  this.state.orders.length >= 1 ? (
                    <button onClick={ () => this.setVisable( true, record.orderId ) }>Add Amount Paid</button>
                  ) : null,
            },
        ];
        
    
        return (
            <div className="delivery-report-container" style={{ marginTop: 16 }}>
                <h1 className="page-title">Orders Report</h1>
                <div style={{ marginBottom: 20 }}>
                <Button
                    style={{ borderColor:"#f5222d"}}
                    htmlType="button"
                    size="large"
                    className="back-button"
                    onClick={ this.handleBackClick("/campaigns")}> Back </Button>    
                <Modal
                  title="Update amount Paid"
                  centered
                  destroyOnClose={true}
                  visible={ this.state.visable }
                  onOk={ () => this.handlePaid( false ) }
                  onCancel={ () => this.setVisable( false, 0 ) }>
                 <Form>
                    <FormItem
                        label="Paid">
                        <Input 
                            name="paid"
                            size="large"
                            type="number" 
                            autocomplete="off"
                            placeholder="$0.00"
                            value={this.state.amount}
                            onChange={(event) => this.handlePaidChange(event) } maxLength="8"/>
                    </FormItem>
                  </Form>
               </Modal>
                    <Table 
                        dataSource={this.state.orders} 
                        columns={columns} 
                        rowKey={(record) => record.orderId}
                        expandedRowRender={(record, i) =>
                            this.getOrderedProducts(i)}
                            
                        bordered
                        pagination={false}
                        scroll={{ y: 570 }}
                    />
                </div>
            </div>
        );
    }
}



export default OrdersReport;
