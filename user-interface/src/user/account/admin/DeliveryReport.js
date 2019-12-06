/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created:
 * Description: The DeliveryReport class component renders table containing all orders made in the current campaign
 * that have not been delivered as well as products associated with each order. The page also contains a toggle button
 * that allows the admin to render a table that contains all orders that have been delivered, as well as the products 
 * associated with it. The admin will be able to select one or several products and change their delivery status from
 * not delivered to delivered and viceversa. The main handlers/function s in this component are:
 *      - componentDidMount
 *      - start
 *      - onSelectChange
 *      - toggle
 *      - getOrderedProducts
 *      - handleBackClick
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import React, { Component } from 'react';
import {CSVLink, CSVDownload} from 'react-csv';
import './DeliveryReport.css';
import { 
    getOrdersNotDelivered, getProductsOrdered, 
    getOrdersDelivered,getProducts, 
    setToDelivered } from '../../../util/APIFunctions';
import { Button, notification, Table, Row, Col } from 'antd';


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
    
    /*---------------------------------------------------------------------------------------------------------------------
     * Function: componentDidMount is executed as soon as the component is mounted; when the application or the page itself
     * is accessed. This function takes care of retrieving all the orders placed in the given campaign, as well as the 
     * products included in each order. It sends three HTTP request to the API requesting orders, products, and products
     * in the order. 
     * Parameters: None
     * Preconditions:
     *      - A campaign must have been previously selected and stored in local Storage.
     * Postconditions: 
     *      - All orders in the campaign will have retrieved and stored in the orders state.
     *      - All products in the campaign will have bee retrieved and stored in the productTmp state.
     *      - All products included in each order will be retrieved and stored in the items state, including their name,
     *        id and quantity. 
     *---------------------------------------------------------------------------------------------------------------------*/
    async componentDidMount() {
        const allProducts = [];
        var data = [];
        const products = []
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"];
        
        /* Make HTTP request to get all campaign products and save in state */
        await getProducts(campaignYear)
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
        
        /* Iterate through the products and storing key/value pairs with product ID and name */
        const tempProd = this.state.productTmp;
        for( var i = 0; i < tempProd.length; i++ ){
            allProducts[ tempProd[i].productId ] = tempProd[i].product
        }
        
        /* Check the toggle value to render specific table */
        if( this.state.toggle === 1 ) {
            /* Make HTTP request to get all orders not delivered in the campaign and save them in a state */
            await getOrdersNotDelivered(campaignYear)
                .then (response => {
                    this.setState({
                        orders: response
                    });
                    
                    /* Iterate throught the orders and format the total cost and paid to display in table */
                    const orders = this.state.orders;
                    for (var i = 0; i < orders.length; i++) {
                        if (orders[i].totalCost != undefined) 
                            this.state.orders[i].totalCost = "$" + orders[i].totalCost.toString() + ".00";
                        if (orders[i].paid != undefined)
                            this.state.orders[i].paid = "$" + orders[i].paid.toString() + ".00";
                    }
                })
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:error.message || 'Sorry! Something went wrong!'
                    });
                })
        }
        else if( this.state.toggle === 2 ) {
            /* Make HTTP request to get all orders delivered in the campaign and save them in a state */
            await getOrdersDelivered(campaignYear)
                .then (response => {
                    this.setState({
                        orders: response
                    });
                    
                    const orders = this.state.orders;
                    
                    for (var i = 0; i < orders.length; i++) {
                        if (orders[i].totalCost != undefined) 
                            this.state.orders[i].totalCost = "$" + orders[i].totalCost.toString() + ".00";
                        if (orders[i].paid != undefined)
                            this.state.orders[i].paid = "$" + orders[i].paid.toString() + ".00";
                    }
                })
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:error.message || 'Sorry! Something went wrong!'
                    });
                })
        }
        
        /* Iterate through orders and send an HTTP request for each order to retrieve all products associated with the order */
        const orders = this.state.orders;
        for (var i = 0; i < orders.length; i++) {
            await getProductsOrdered(orders[i].orderId) 
                .then (productResponse => {
                    /* Iterates through the returned products and generate a hash table of key/value pairs with the products name, ID, and quantity,
                     * then add each of these hash tables to an array. This array then gets added to another array that will relate each set of products
                     * to a row in the table. */
                    const length = productResponse.length;
                    for (var i = 0; i < length; i++) {
                        const item = { productID: productResponse[i].productId, name: allProducts[productResponse[i].productId], quantity: productResponse[i].quantity };
                        data.push(item);
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
        this.setState({items: products});
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Function: start takes all orders selected and changes their delivery status by sending an HTTP PUT request to
    * the API to modify the orders table. The HTTP request used depends on the toggle value.
    * Parameters: None
    * Preconditions: 
    *       - selectedRowKeys must not be null or undefined
    *       - toggle must be defined
    * Postconditions:
    *       - The selected orders' delivery status will have been changed from delivered to not delivered or viceversa.
    *---------------------------------------------------------------------------------------------------------------------*/
    start = () => {
        const success = true;
        this.setState({ loading: true });
        
        /* If the table is of orders not delivered, send HTTP request to change the status to delivered for
         * each of the orders selected in the table */
        const selectedRowKeys = this.state.selectedRowKeys;
        if( this.state.toggle === 1 ) {
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
            }/*End for*/
            
            if (success) {
                window.location.reload();
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description:'Order(s): ' + selectedRowKeys + " have been set to 'Delivered'"
                });
            }
        }/*end if*/
        /* If the table is of orders delivered, send HTTP request to change the status to not delivered for
         * each of the orders selected in the table */
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

  
   /*---------------------------------------------------------------------------------------------------------------------
    * Function: onSelectChange assigns the array of order IDs of the selected orders to a state
    * Parameters: 
    *       - Array of integers representing the order IDs of the selected orders
    * Preconditions: 
    *       - Alll order IDs must exists and be non null values
    * Postconditions:
    *       - The selectedRowKeys state will be set to the array of order IDs
    *---------------------------------------------------------------------------------------------------------------------*/
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

   /*---------------------------------------------------------------------------------------------------------------------
    * Function: toggle changes the toggle state between 1 and 2 based on the toggle button's click.
    * Parameters: None
    * Preconditions: None
    * Postconditions:
    *       - The toggle state will be set to the correct value 1 or 2.
    *---------------------------------------------------------------------------------------------------------------------*/
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
  
   /*---------------------------------------------------------------------------------------------------------------------
    * Function: getOrderedProducts defines the columns and data that will be rendered when any order is expanded. This 
    * will display the products associated with the selected order as a smaller table.
    * Parameters:
    *       - Integer x represents the row for which the products will be displayed
    * Preconditions: 
    *       - The order must have products associated with it, otherwise no data will be displayed
    * Postconditions:
    *       - When an order row is expanded, the products associated with that order will be displayed.
    *---------------------------------------------------------------------------------------------------------------------*/
    getOrderedProducts(x)  {
        const columns = [
            { title: 'Product ID', dataIndex: 'productID', key: 'productID' },
            { title: 'Product Name', dataIndex: 'name', key: 'name' },
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        ];

        const products = this.state.items;
        const data = products[x];
        return <Table rowKey="productID" columns={columns} dataSource={data} pagination={false} />
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleBackClick will handle the action of the back button. If the back button is clicked, the user will be
    * redirected to the previous page. In this case the campaign configuration page.
    *---------------------------------------------------------------------------------------------------------------------*/ 
    handleBackClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
     }
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Function: render takes care of rendering all component elements to the screen. Here we define the main table's
    * columns. Here we also handle row selection to change the delivery status. Then the return includes all JSX/HTML 
    * components and their formatting. In this portion we define the table and necessary buttons.
    *---------------------------------------------------------------------------------------------------------------------*/    
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
        
        const hasSelected = selectedRowKeys.length > 0;
        var subheading 
        if( this.state.toggle === 1 ) {
            subheading = "Orders NOT Delivered";
        }
        else if( this.state.toggle === 2 ) {
            subheading = "Orders Delivered";
        }
        
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
                <Row gutter={[860]} type="flex">
                    <Col span={30}>    
                        <CSVLink data={this.state.orders} > Download Delivery Report </CSVLink>
                    </Col>
                    
                    <Col span={30}>
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
