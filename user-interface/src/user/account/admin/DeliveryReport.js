//import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import {CSVLink, CSVDownload} from 'react-csv';
import './DeliveryReport.css';
import { 
    getOrdersNotDelivered, 
    getProductsOrdered, 
    getOrdersDelivered,
    getProduct, 
    getProducts, 
    setToDelivered } from '../../../util/APIFunctions';

import {
    Form, 
    Input, 
    Button, 
    notification, 
    Table, 
    Badge, 
    Menu, 
    Dropdown, 
    Icon,
    Row,
    Col } from 'antd';


class DeliveryReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantity: 0,
            productID: 0,
            orders: '',
            productTmp: '',
            productName: "",
            items: '',
            orderNumber: 0,
            toggle: JSON.parse(localStorage.getItem('delivery')) || 1,
            selectedRowKeys: [],
            loading: false,
        }
    }
    
/*******************************************************************************************/  
    async componentDidMount() {
        console.log( this.state.toggle );
        var productQuantities= [];
        var product= [];
        const allProducts = [];
        var data = [];
        const products = []
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"];
        //var orders = [];
        const response = await getProducts(campaignYear)
            .then( response => {
                this.setState( {
                    productTmp: response
                });
             } )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong!'
                });
            })
        const idk = this.state.productTmp;
        //console.log( idk );
        for( var i = 0; i < idk.length; i++ ){
            allProducts[ idk[i].productId ] = idk[i].product
        }
        console.log( allProducts );
        
        //console.log("hello" + campaignYear);
        if( this.state.toggle === 1 ){
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
                //console.log("Orders:" + JSON.stringify(this.state.orders));
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            })
        }
        else if( this.state.toggle === 2 ){
            const response = await getOrdersDelivered(campaignYear)
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
                    //console.log("Orders:" + JSON.stringify(this.state.orders));
                })
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:error.message || 'Sorry! Something went wrong!'
                    });
                })
            }
        const orders = this.state.orders;
        //console.log(orders[0].orderId);
        for (var i = 0; i < orders.length; i++) {
            const productResponse = await getProductsOrdered(orders[i].orderId) 
                .then (productResponse => {
                    const length = productResponse.length;
                    for (var i = 0; i < length; i++) {
                        //do the api call to get product with productid
                        const item = { productID: productResponse[i].productId, name: allProducts[productResponse[i].productId], quantity: productResponse[i].quantity };
                        //console.log(orders[i].orderId, item);
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
        //console.log(this.state.items);
    }

/*******************************************************************************************/    
    start = () => {
        const success = true;
        console.log(this.state.loading);
        this.setState({ loading: true });
        
        const selectedRowKeys = this.state.selectedRowKeys;
        console.log(this.state.selectedRowKeys);
        if( this.state.toggle === 1 ){
            for (var i = 0; i < selectedRowKeys.length; i++) {
                setToDelivered(selectedRowKeys[i], true) 
                    .catch(error => {
                        notification.error({
                            message: 'LCHS Band Fundraising',
                            description:error.message || 'Sorry! Something went wrong!'
                        });
                        success = false;
                    });
                if (!success)
                    break;
            }//End for
            if (success) {
                window.location.reload();
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description:'Order(s): ' + selectedRowKeys + " have been set to 'Delivered'"
                });
            }
        }//end if
        else if( this.state.toggle === 2 ){
            for (var i = 0; i < selectedRowKeys.length; i++) {
                setToDelivered(selectedRowKeys[i], false) 
                    .catch(error => {
                        notification.error({
                            message: 'LCHS Band Fundraising',
                            description:error.message || 'Sorry! Something went wrong!'
                        });
                        success = false;
                    });
                if (!success)
                    break;
            }//End for
            if (success) {
                window.location.reload();
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description:'Order(s): ' + selectedRowKeys + " have been set to 'NOT Delivered'"
                });
            }
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

    toggle = () => {
        if( this.state.toggle === 1 ){
            this.setState( { toggle: 2 } );
            localStorage.setItem( 'delivery', 2 );
            window.location.reload();
        }
        else if( this.state.toggle === 2 ){
            this.setState( { toggle: 1 } );
            localStorage.setItem( 'delivery', 1 );
            window.location.reload();
        }
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
        ];
        
        const loading = this.state.loading
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        console.log(selectedRowKeys);
        const hasSelected = selectedRowKeys.length > 0;
        var subheading 
        if( this.state.toggle === 1 ){
            subheading = "Orders NOT Delivered";
        }
        else if( this.state.toggle === 2 ){
            subheading = "Orders Delivered";
        }
        const newline = "";
        
        return (
            <div className="delivery-report-container">
                <h2 className="page-title">Delivery Report</h2>
                <Row gutter={[110]} type = 'flex'>
                    <Col span={7}>
                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                            Update Delivery Status 
                        </Button>
                        <div>
                        <span style={{ marginRigth: 8 }}>
                            {hasSelected ? ` Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                        </div>
                    </Col>
                    <Col span={10}>
                    <h3 className="sub-heading" align="center"> {subheading} </h3>
                    </Col>
                    <Col span={7}>
                        <Button type="primary" onClick={this.toggle}>
                                Toggle Delivery Report
                        </Button>
                    </Col>
                </Row>
                <div className="table">
                    <Table 
                        dataSource={this.state.orders} 
                        columns={columns} 
                        rowKey={(record) => record.orderId}
                        rowSelection={rowSelection}
                        expandedRowRender={(record, i) =>
                            this.getOrderedProducts(i)}
                            
                        bordered
                        pagination={false}
                        scroll={{ y: 500 }} />
                </div>
                <Row gutter={[150]} type="flex">
                    <Col span={7}>    
                        <CSVLink data={this.state.orders} > Download Delivery Report </CSVLink>
                    </Col>
                    <Col span={10}></Col>
                    <Col span={7}>
                        <Button
                            style={{ borderColor:"#f5222d"}}
                            htmlType="button"
                            size="large"
                            className="back-button"
                            onClick={ this.handleBackClick("/campaigns")}> Back </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default DeliveryReport;
