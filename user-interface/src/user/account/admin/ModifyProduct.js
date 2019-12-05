/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created:
 * Description: The ModifyProduct class components renders a table containing all products included in the selected 
 * campaign and allows the admin to either modify or delete (only root) the product. Note that the admin can only
 * modify the description, price, and name of the product, not the image. The main handlers/function s in this component
 * are:
 *      - componentDidMount
 *      - handleInputChange
 *      - showModal
 *      - handleCancel
 *      - handleDelete
 *      - handleBackClick
 *      - handleSubmit
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getProducts, deleteProduct, 
         updateProduct, getProduct } from '../../../util/APIFunctions';
import { Form, notification, Table, 
         Modal, Popconfirm, Divider, 
         Input, Button } from 'antd';

const FormItem = Form.Item;

class ModifyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           CampaignID: '',
           submitted: false,
           products: '',
           product: '',
           visible: false,
           productID: 0,
           productName: { value: '' },
           description: { value: '' },
           price:       { value: '' },
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }//end constructor
 
   /*---------------------------------------------------------------------------------------------------------------
    * Function: componentDidMount is executed as soon as the component is mounted; when the application or the page itself
    * is accessed. This function takes care of retrieving all the products in the given campaign. It sends an HTTP GET 
    * request to the API and stores the result in a state.
    * in the order. 
    * Parameters: None
    * Preconditions:
    *      - A campaign must have been previously selected and stored in local Storage.
    * Postconditions: 
    *      - All products in the campaign will have retrieved, formatted and stored in the products state.
    *---------------------------------------------------------------------------------------------------------------*/   
    async componentDidMount() {
        let setCampaign = JSON.parse(localStorage.getItem('setCampaign'));
        let campaignYear = setCampaign["year"];
        
        await getProducts(campaignYear)
            .then( response => {
                this.setState( {
                    products: response
                });
                const products = this.state.products;
                for (var i = 0; i < products.length; i++) {
                    if (products[i].price != undefined) {
                        this.state.products[i].price = "$" + products[i].price.toString() + ".00";
                    }
                }
             })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description: error.message || 'Sorry! Something went wrong!'
                });
            });
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleInputChange handles the change of state of the every one of the user's input quantity. The handler
    * takes an event, which is the user's and assigns the input value to the specified state.
    *---------------------------------------------------------------------------------------------------------------------*/
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

    /*---------------------------------------------------------------------------------------------------------------
    * Function: showModal sets the visible state for the modal, and retrieves all the given product
    * Parameters:
    *       - Integer product represents the product ID of the product that will be modified.
    * Preconditions: 
    *       - The product ID must exist, i.e. not undefined or null.
    * Postconditions:
    *       - The product with id product will have been retrieved and stored in the product state.
    *---------------------------------------------------------------------------------------------------------------*/
    async showModal(product) {
        await this.setState({ productID: product });
        await getProduct(this.state.productID)
            .then( response => {
                this.setState( {
                    product: response
                });
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
        this.setState({ visible: true });
    };
    
    
   /*---------------------------------------------------------------------------------------------------------------
    * Handler: handleCancel sets the visible state ot false makes the modal disappear when cancel is clicked.
    *---------------------------------------------------------------------------------------------------------------*/
    handleCancel = () => {
        this.setState({ visible: false });
    };

   /*---------------------------------------------------------------------------------------------------------------
    * Handler: handleDelete handles the deletion of the selected product from the database. This action is only
    * allowed for the God or root admin. An HTTP request is sent to the API to remove the product.
    * Parameters:
    *       - Integer productID contains the ID of the product that will be deleted
    * Preconditions:
    *       - The current user must be the root admin
    *       - The product with productID must exist. 
    * Postconditions:
    *       - The product with product ID number will no longer exist in the database.
    *---------------------------------------------------------------------------------------------------------------*/
    async handleDelete(productID) {
        let user_role = '';
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            user_role = currentUser.role;
        }
        
        if (user_role === 'Role_ROOT') {
            await deleteProduct(productID)
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
            
            setTimeout( function( ) {
                window.location.reload();
            }.bind( this ), 1000 );
        }
        else {
            notification.error({
                message: 'LCHS Band Fundraising',
                description: 'You must be GOD (admin) to do this!'
            });
        }
    }

    
   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleBackClick will handle the action of the back button. If the back button is clicked, the user will be
    * redirected to the previous page. In this case the campaign configuration page.
    *---------------------------------------------------------------------------------------------------------------------*/ 
    handleBackClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
     }

     
   /*---------------------------------------------------------------------------------------------------------------
    * Handler: handleSubmit takes the submit event from the editing modal and updates the product information for the 
    * selected product with the user's input. This handlers sends and HTTP request to modify the product.
    * Preconditions: None
    * Postconditions:
    *       - The product selected will have been updated with the information entered by the user. If no value was 
    *         entered, the product keeps the same information. 
    *---------------------------------------------------------------------------------------------------------------*/
    async handleSubmit(event) {
        event.preventDefault();
        var price, product, description;
        
        /* If no input is entered keep the previous value */
        if (this.state.productName.value === '') {
            product = this.state.product.product;
        } else {
            product = this.state.productName.value;
        }
            
        if (this.state.price.value === '') {
            price = this.state.product.price;
        } else {
            price  = (this.state.price.value.split('.'))[0];
        }
        
        if (this.state.description.value === '') {
            description = this.state.product.description;
        } else {
            description = this.state.description.value;
        }
        
        /* Define the new product info */
        const updatedProduct = {
            product: product,
            price: price,
            description: description,
        };
      
        /* Send HTTP request */
        updateProduct(this.state.productID, updatedProduct)
            .then (response => {
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Your product has been modified!"
                });
                window.location.reload();
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
    };

    
   /*---------------------------------------------------------------------------------------------------------------
    * Function:
    * Parameters:
    * Preconditions:
    * Postconditions:
    *---------------------------------------------------------------------------------------------------------------*/
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
            {
                title: 'Action',
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
        return (
            <div className="modify-product-container">
                <h2 className="page-title">Products</h2>
                <div className="table">
                    <Button
                        style={{ borderColor:"#f5222d"}}
                        htmlType="button"
                        size="large"
                        className="back-button"
                        onClick={ this.handleBackClick("/campaigns")}> Back </Button>
                    
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
                                name="productName"
                                size="large"
                                type="text" 
                                autocomplete="off"
                                placeholder="product name"
                                value={this.state.productName.value}
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
export default WrappedDemo;
