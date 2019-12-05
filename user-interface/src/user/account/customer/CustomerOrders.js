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
        const idk = this.state.productTmp;
        for( var i = 0; i < idk.length; i++ ){
            allProducts[ idk[i].productId ] = idk[i].product
        }//end for
        let user_id = 0;

        if(this.props.currentUser){
            let currentUser = this.props.currentUser;
            user_id = currentUser.userId;
        }
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
    
    getOrderedProducts(x)  {
        const columns = [
        { title: 'Product ID', dataIndex: 'productID', key: 'productID' },
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        //{ title: 'Product Name', dataIndex: 'product', key: 'product' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        ];//end columns

        const products = this.state.items;
        const data = products[x];
        return <Table columns={columns} dataSource={data} pagination={false} />
    }//end getOrderedProducts
    
    handleClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
    };//end handleClick
    
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