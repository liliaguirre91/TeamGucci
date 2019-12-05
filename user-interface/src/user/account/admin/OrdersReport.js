/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created:
 * Description: The OrdersReport class components renders a table containing all orders made in the current campaign
 * as well as products associated with each order. Also, each order will allow the admin to modify the amount paid 
 * towards the order. The main handlers/function s in this component are:
 *      - componentDidMount
 *      - getOrderedProducts
 *      - setVisable
 *      - handlePaid
 *      - handlePaidChange
 *      - handleBackClick
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import React, { Component } from 'react';
import { getOrders, getProductsOrdered, 
         getProducts, setPaid } from '../../../util/APIFunctions';
import { Form, Input, Button, 
         notification, Table, Modal, } from 'antd';

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
        let campaignYear = setCampaign["year"]
        
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
                    description:error.message || 'Sorry! Something went wrong!'
                });
            })
        
        /* Iterate through the products and storing key/value pairs with product ID and name */
        const tempProd = this.state.productTmp;
        for( var i = 0; i < tempProd.length; i++ ){
            allProducts[ tempProd[i].productId ] = tempProd[i].product
        }
        
        /* Make HTTP request to get all orders in the campaign and save them in a state */
        await getOrders(campaignYear)
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
    * Function: setVisable sets the visible state for the modal, and sets the orderId state based on the value passed.
    * Parameters:
    *       - Boolean vis determines if the modal will become visible
    *       - Integer orderId represents the order ID associated with the row
    * Preconditions: None
    * Postconditions:
    *       - After this function is executed the modal will either become visible, or it will dissapear, based on the
    *          value of vis.
    *       - The orderId state will contain the order ID related to the row in the table where the button was clicked.
    *---------------------------------------------------------------------------------------------------------------------*/ 
    setVisable( vis, orderId ){
        this.setState( { visable: vis } );
        this.setState( { orderId: orderId } );
    }
    
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handlePaid will add the inputted ammount to the total amount paid for the order from the selected row. This
    * fucntion send a PUT HTTP request to the API to modify the database.
    * Parameters: 
    *        - Boolean vis used to set the visible state for the modal.
    * Preconditions: 
    *       - An amount must be entered into the unput box in the modal
    * Postconditions:
    *       - The inputted amount will have been added to the total amount paid for the selected order
    *       - The modal will be closed and the window will be reloaded
    *---------------------------------------------------------------------------------------------------------------------*/ 
    async handlePaid( vis ){
        var success = false;
        const orderID = this.state.orderId;
        const paidAmt = (this.state.amount.split('.'))[0];
        
        /* Make HTTP request to modify the amount paid on the order and set a success flag */
        await setPaid( orderID, paidAmt )
            .then(response => {
                success = true;
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
        
        if (success) {
            notification.success({
                message: 'LCHS Band Fundraising',
                description: 'The entered amount has been added to this order'
            })
        }
        
        setTimeout( function( ) {
            this.setState( { visable: vis } );
            window.location.reload();
        }.bind( this ), 1000 );
    }
 
 
   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handlePaidChange will handle the input entered by the user and set the amount state. The handler takes an 
    * event, in this case the user's input for the amount to be added to the total paid on the order.
    *---------------------------------------------------------------------------------------------------------------------*/ 
    handlePaidChange(event) {
        this.setState({ amount: event.target.value});
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
    * columns and hanlde any actions that will be included in the columns. Then the return includes all JSX/HTML components
    * and their formatting. In this portion we define the table, modal, and form that will be used in the page. 
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
            {
              title: 'Change Amount Paid',
              key: 'action',
              render: (text, record) =>
                  this.state.orders.length >= 1 ? (
                    <Button onClick={ () => this.setVisable( true, record.orderId ) }>Add</Button>
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
