import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getProducts,
         deleteProduct, 
         updateProduct } from '../../../util/APIFunctions';
import { Form, 
         notification, 
         Table, 
         Modal, 
         Popconfirm, 
         Divider, 
         Input } from 'antd';
const FormItem = Form.Item;


class ModifyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           CampaignID: '',
           submitted: false,
           products: '',
           visible: false,
           productID: 0,
           product: { value: '' },
           description: { value: '' },
           price:       { value: '' },
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }//end constructor
 
 /*---------------------------------------------------------------------------------------------------------------*/   
    async componentDidMount() {
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"];
        
        const response = await getProducts(campaignYear)
            .then( response => {
                this.setState( {
                    products: response
                });
                const products = this.state.products;
                for (var i = 0; i < products.length; i++) {
                    //console.log("total cost:" + orders[i].totalCost)
                    //console.log("Price:" + products[i].price);
                    if (products[i].price != undefined) {
                        this.state.products[i].price = "$" + products[i].price.toString() + ".00";
                        console.log("Price:" + this.state.products[i].price);
                    }
                }
             })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong!'
                });
            });
            
            //console.log(JSON.stringify(this.state.products));
    }

/*---------------------------------------------------------------------------------------------------------------*/
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
    
        this.setState ({
            [inputName] : {
            value: inputValue
            }
        });
    }

/*---------------------------------------------------------------------------------------------------------------*/
    showModal = (product) => {
        this.setState({ productID: product });
        /*getProduct(this.state.productID)
            .then( response => {
                this.setState( {
                    products: response
                });*/
        
        this.setState({ visible: true });
    };
    
    handleCancel = () => {
        this.setState({ visible: false });
    };
 
/*---------------------------------------------------------------------------------------------------------------*/
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

/*---------------------------------------------------------------------------------------------------------------*/    
        async handleSubmit(event) {
        event.preventDefault();
        /*this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });*/
        //console.log( this.state.image );
        //const camp = JSON.parse(localStorage.getItem( 'setCampaign' ));
        //console.log (this.state.product.value);
        const price  = this.state.price.value.split('.');
        const updatedProduct = {
            product: this.state.product.value,
            price: price[0],
            description: this.state.description.value,
        };
      
        updateProduct(this.state.productID, updatedProduct)
            .then (response => {
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Your product has been modified!"
                });
                //this.props.history.push("/admin-account"); //for now will redirect to home, later to confirmation
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
};
/*---------------------------------------------------------------------------------------------------------------*/
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
            },*/
            {
                title: 'Action',
                //dataIndex: 'action',
                key: 'action',
                render: (text, record) =>
                    this.state.products.length >= 1 ? (
                        <span>
                            <Popconfirm title="Are you sure you want to delete this product? This CANNOT be undone!!" onConfirm={() => this.handleDelete(record.productId)}>
                                <a>Delete</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                                <a onClick = {() => this.showModal(record.productId) }>Edit</a>
                        </span>
                    ) : null,
            },
        ];
        //const { getFieldDecorator } = Form.create({ name: 'edit_form' });
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
                <Modal
                    visible={ this.state.visible }
                    title="Edit the product"
                    okText="Submit Changes"
                    onCancel={ () => this.handleCancel()}
                    onOk={ this.handleSubmit }
                >
                    <Form layout="vertical">
                        <FormItem
                            label="Product">
                            <Input 
                                name="product"
                                size="large"
                                type="text" 
                                autocomplete="off"
                                placeholder="product name"
                                value={this.state.product.value}
                                onChange={(event) => this.handleInputChange(event) } maxLength="20"/>
                        </FormItem>
                        <FormItem
                            label="Product description">
                            <Input 
                                name="description"
                                size="large"
                                type="text" 
                                autocomplete="off"
                                placeholder="description"
                                value={this.state.description.value}
                                onChange={(event) => this.handleInputChange(event) } maxLength="50"/>
                        </FormItem>
                        <FormItem
                            label="Price">
                            <Input 
                                name="price"
                                size="large"
                                type="Integer" 
                                autocomplete="off"
                                placeholder="0.00"
                                value={this.state.price.value}
                                onChange={(event) => this.handleInputChange(event) } maxLength="5"/>
                        </FormItem>
                    </Form>
                </Modal>
                
            </div>
        );
    }
}
const WrappedDemo = Form.create({ name: 'validate_other' })(ModifyProduct);
ReactDOM.render(<ModifyProduct />, document.getElementById('root'));        
//export default ModifyProduct;
export default WrappedDemo;
