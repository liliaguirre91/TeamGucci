/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: November 21, 2019
 * Description: The CustomerOrders class components renders a table containing all orders made in the current campaign
 * as well as products associated with each order. Also, each order will allow the admin to modify the amount paid 
 * towards the order. 
 * The main handlers/function s in this component are:
 *      - componentDidMount
 *      - getOrderedProducts
 *      - handleClick
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import React, { Component } from 'react';
import { getPreviousOrders, getProductsOrdered, getAllProducts } from '../../../util/APIFunctions';
import { 
    Button, 
    notification, 
    Table } from 'antd';


class CustomerOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantity: 0,
            productID: 0,
            orders: '',
            productTmp: '',
            productName: "",
            items: null,
            orderNumber: 0
        }//end state
    }//end constructor
    
  
    /*---------------------------------------------------------------------------------------------------------------------
     * Function: componentDidMount is executed as soon as the component is mounted; when the application or the page itself
     * is accessed. This function takes care of retrieving all the orders placed by this user, as well as the 
     * products included in each order. It sends three HTTP request to the API requesting orders, products, and products
     * in the order. 
     * Parameters: None
     * Preconditions:
     *      - A user must be logged in.
     * Postconditions: 
     *      - All orders in the campaign will have retrieved and stored in the orders state.
     *      - All products in the campaign will have been retrieved and stored in the productTmp state.
     *      - All products included in each order will be retrieved and stored in the items state, including their name,
     *        id and quantity. 
     *---------------------------------------------------------------------------------------------------------------------*/
    async componentDidMount() {
        const allProducts = [];
        var data = [];
        const products = [];
        await getAllProducts( )
            .then( response => {
                this.setState( {
                    productTmp: response
                });//end setState
             })//end then
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });//end notification
            })//end catch
        const tempProd = this.state.productTmp;
        for( var i = 0; i < tempProd.length; i++ ){
            allProducts[ tempProd[i].productId ] = tempProd[i].product
        }//end for
        let user_id = 0;

        if(this.props.currentUser){
            let currentUser = this.props.currentUser;
            user_id = currentUser.userId;
        }//end if
        await getPreviousOrders(user_id)
            .then (response => {
                this.setState({
                    orders: response
                });//end setState
                const orders = this.state.orders;
                for (var i = 0; i < orders.length; i++) {
                    this.state.orders[i].totalCost = "$" + orders[i].totalCost.toString() + ".00";
                    this.state.orders[i].paid = "$" + orders[i].paid.toString() + ".00";
                }//end for
            })//end then
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });//end notification
            })//end catch
        
        const orders = this.state.orders;
        for (var i = 0; i < orders.length; i++) {
            await getProductsOrdered(orders[i].orderId) 
                .then (productResponse => {
                    const length = productResponse.length;
                    for (var i = 0; i < length; i++) {
                        /* do the api call to get product with productid */
                        const item = { productID: productResponse[i].productId, name: allProducts[productResponse[i].productId], quantity: productResponse[i].quantity };
                        data.push(item);
                    }//end for
                     products.push(data);
                     data = [];
                })//end then
                .catch(error => {
                    notification.error({
                        message: 'LCHS Band Fundraising',
                        description:error.message || 'Sorry! Something went wrong!'
                    });//end notification
                })//end catch
        }//end for
        this.setState({items: products});
    }//end componentDidMount
    
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
        ];//end columns

        const products = this.state.items;
        const data = products[x];
        return <Table columns={columns} dataSource={data} pagination={false} />
    }//end getOrderedProducts
    
    /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleClick will handle the action of the back button. If the back button is clicked, the user will be
    * redirected to the previous page. In this case the user account page.
    *---------------------------------------------------------------------------------------------------------------------*/ 
    handleClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
    };//end handleClick
    
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
        ];//end columns
    
        return (
            <div className="delivery-report-container">
                <h1 className="page-title">My Orders</h1>
                <Button
                style={{ borderColor:"#f5222d"}}
                htmlType="submit"
                size="large"
                className="customer-back-button"
                onClick={this.handleClick("/user-account")}>Back</Button>
                
                <Table 
                
                    dataSource={this.state.orders} 
                    columns={columns} 
                    rowKey={(record) => record.id}
                    expandedRowRender={(record, i) =>
                        this.getOrderedProducts(i)} 
                    bordered
                    pagination={false}
                    
                />
            </div>
        );//end return
    }//end render
}//end CustomerOrders

export default CustomerOrder;
