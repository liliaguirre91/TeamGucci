import React, { Component } from 'react';
import { getProducts, deleteProduct } from '../../../util/APIFunctions';
import { Form, notification, Table, Modal, Popconfirm } from 'antd';
const FormItem = Form.Item;


class ModifyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           CampaignID: '',
           submitted: false,
           products: '',
        };
    }//end constructor
    
    async componentDidMount() {
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"];
        
        const response = await getProducts(campaignYear)
            .then( response => {
                this.setState( {
                    products: response
                });
             })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong!'
                });
            });
    }
    
    async handleDelete(productID) {
        console.log(productID);
        const response = await deleteProduct(productID)
            .then (response => {
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: 'Product has been deleted from the system!'
                });
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong!'
                });
            });
            window.location.reload();
    }
    
    render() {
        const columns = [
            {
                title: 'Product Number',
                dataIndex: 'productId',
                key: 'productId',
            },
            {
                title: 'Product Name',
                dataIndex: 'product',
                key: 'product',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            /*{
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
            },
            {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },*/
            {
                title: 'Delete Action',
                //dataIndex: 'action',
                key: 'action',
                render: (text, record) =>
                    this.state.products.length >= 1 ? (
                        <Popconfirm title="Are you sure you want to delete this product? This CANNOT be undone!!" onConfirm={() => this.handleDelete(record.productId)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        
        return (
            <div className="modify-product-container">
                <h2 className="page-title">Products</h2>
                <div className="table">
                    <Table 
                        dataSource={this.state.products} 
                        columns={columns} 
                        rowKey={(record) => record.productId}
                        bordered
                        pagination={false}
                        scroll={{ y: 500 }}
                    />
                </div>
            </div>
        );
    }
}

export default ModifyProduct;
