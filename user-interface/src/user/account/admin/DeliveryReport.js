//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { getOrdersNotDelivered, getProductsOrdered, getProduct, setToDelivered } from '../../../util/APIFunctions';
import {
    Form, 
    Input, 
    Button, 
    notification, 
    Table, 
    Badge, 
    Menu, 
    Dropdown, 
    Icon } from 'antd';


class DeliveryReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantity: 0,
            productID: 0,
            orders: '',
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
        var productIDs= [];
        var data = [];
        const products = []
        //var orders = [];
        
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"]
        //console.log("hello" + campaignYear);
        const response = await getOrdersNotDelivered(campaignYear)
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
                        this.setState({
                            productQuantity: productResponse[i].quantity,
                            productID: productResponse[i].productId
                        });
                        //do the api call to get product with productid
                        const item = { productID: this.state.productID, quantity: this.state.productQuantity };
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
    start = () => {
        const success = true;
        console.log(this.state.loading);
        this.setState({ loading: true });
        
        const selectedRowKeys = this.state.selectedRowKeys;
        console.log(this.state.selectedRowKeys);
        for (var i = 0; i < selectedRowKeys.length; i++) {
            setToDelivered(selectedRowKeys[i]) 
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:error.message || 'Sorry! Something went wrong!'
                    });
                    success = false;
                });
            if (!success)
                break;
        }
        if (success) {
            window.location.reload();
            notification.success({
                message: 'LCHS Band Fundraising',
                description:'Order(s): ' + selectedRowKeys + " have been set to 'Delivered'"
            });
        }
        
        setTimeout(() => {
        this.setState({
            selectedRowKeys: [],
            loading: false,
        });
        }, 1000);
    };

  
/*******************************************************************************************/    
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
  
  
/*******************************************************************************************/  
    getOrderedProducts(x)  {
        console.log(x);
        //const productQuantities= [];
        //const productIDs= [];
        const orders = this.state.orders;
        
        const columns = [
        { title: 'Product ID', dataIndex: 'productID', key: 'productID' },
        //{ title: 'Product Name', dataIndex: 'product', key: 'product' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        ];

        const products = this.state.items;
        const data = products[x];
        return <Table rowKey="productID" columns={columns} dataSource={data} pagination={false} />
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
        ];
        
        const loading = this.state.loading
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        console.log(selectedRowKeys);
        const hasSelected = selectedRowKeys.length > 0;
    
        return (
            <div className="delivery-report-container">
                <h1 className="page-title">Delivery Report</h1>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                        Set as Delivered 
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table 
                    dataSource={this.state.orders} 
                    columns={columns} 
                    rowKey={(record) => record.orderId}
                    rowSelection={rowSelection}
                    expandedRowRender={(record, i) =>
                        this.getOrderedProducts(i)}
                        
                    bordered
                    pagination={false}
                    scroll={{ y: 600 }}
                    
                />
            </div>
        );
    }
}



export default DeliveryReport;
