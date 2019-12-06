/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created: November 13, 2019
 * Description: The addProduct class components allows an admin to add a product to the selected campaign. This page
 * includes a form where the admin can enter the product's name, price, description, and upload an image. The admin also
 * has the choice to select from a set of products from previous campaigns to add to the current campaign.
 * The main handlers/function s in this component are:
 *      - handleInputChange
 *      - addToCart
 *      - removeFromCart
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
//import 'antd/dist/antd.css';
import './addProduct.css'; //NEED
import {Form, Input, Button, Modal, Table, notification, Row, Col } from 'antd';
import { createProduct, getAllProducts, getProduct } from '../../../util/APIFunctions.js';

const FormItem= Form.Item;

class addProduct extends React.Component {
    constructor(props) {
        super(props);
            this.state = { 
                selectedFile: null,
                product:        { value: '' },
                description:    { value: '' },
                price:          { value: '' },
                image: [],
                products: [],
                visable: false,
            };
        this.handleUpload = this.handleUpload.bind( this );
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setVisable = this.setVisable.bind( this );
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
 
   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleSubmit takes a submit event, defines the new product object and then sends it through a POST
    * HTTP request to the products table with the campaign year stored in local storage.
    * Preconditions:
    *       - A campaign must have been previously selected.
    *       - All input fields must have been defined
    * Postconditions:
    *       - A new product will have been created and added to the database with the information entered by the admin and
    *         the formerly selected campaign year.
    *---------------------------------------------------------------------------------------------------------------------*/
    handleSubmit = e => {
        e.preventDefault();
        if( this.state.image === [] ){
            return;
        }
        
        /* Fields validation */
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });

        /* Retrieve the campaign enetered in previous page and store it. Retrieve and format the price */
        const camp = JSON.parse(localStorage.getItem( 'setCampaign' ));
        const price  = this.state.price.value.split('.');
        
        /* Define a new product object using inputted values */
        const newProduct = {
            product: this.state.product.value,
            price: price[0],
            description: this.state.description.value,
            image: this.state.image,
            yearRan: camp.year
        };
      
        /* Send HTTP POST request to create the product */
        createProduct(newProduct)
            .then (response => {
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Your product has been created!"
                });
                this.props.history.push("/admin-account"); 
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
    };
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleBackClick will handle the action of the cancel button. If the back button is clicked, the user will be
    * redirected to the previous page. In this case the campaign configuration page.
    *---------------------------------------------------------------------------------------------------------------------*/
    handleBackClick = param => e => {
        e.preventDefault();
        this.props.history.push(param);
    }
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: fileChangedHandler sets the selected by state to the selected file that will be uploaded.
    *---------------------------------------------------------------------------------------------------------------------*/
    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    /*---------------------------------------------------------------------------------------------------------------------
    * Function: setVisable sets the visible state for the modal, and retrieves all products
    * Parameters:
    *       - Boolean vis determines if the modal will become visible
    * Preconditions: None
    * Postconditions:
    *       - After this function is executed the modal will either become visible, or it will dissapear, based on the
    *          value of vis.
    *       - If vis is true the products will have been retrieved.
    *---------------------------------------------------------------------------------------------------------------------*/ 
    async setVisable( vis ) {
        if (vis === true) {
            await getAllProducts( )
                .then( response => {
                    this.setState( {
                        products: response
                    });
                } )
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            })
        }
        this.setState( { visable: vis } );
    }
 
    /*---------------------------------------------------------------------------------------------------------------------
    * Function: usePrevious allows the admin to select a product from a previous campaign.
    * Parameters:
    *       - Integer productId represents the product ID of the product selected to be reused.
    * Preconditions: None
    * Postconditions:
    *       - After this function is executed a copy of the selected product will be created, but it will have the selected
    *         campaign year and a new product ID.
    *       - If the admin selects a product that already exists in the campaign, then the products page will contain a
    *         duplicate, which must be deleted manually.
    *---------------------------------------------------------------------------------------------------------------------*/ 
    async usePrevious( productId ){
        /* Retrieve all product information for the selected product by sending an HTTP GET request */
        let newProduct = '';
        await getProduct( productId )
            .then (response => {
                newProduct = response;
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
        
        /* Retrieve campaign year entered in previous page */
        const camp = JSON.parse(localStorage.getItem( 'setCampaign' ));
        newProduct.yearRan = parseInt( camp.year );
        
        /* Define a new product with the retrieved information and send it through an HTTP POST request to create
         * the new product */
        const product = {
            product: newProduct.product,
            price: newProduct.price,
            description: newProduct.description,
            image: newProduct.image,
            yearRan: newProduct.yearRan
        };
        
        await createProduct(product)
            .then (response => {
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Your product has been created!"
                });
                this.props.history.push("/admin-account"); 
            })
            .catch(error => {
                notification.error({
                    message: 'LCHS Band Fundraising',
                    description:error.message || 'Sorry! Something went wrong!'
                });
            });
        this.setState( { visable: false } );
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleUpload takes the upload event and 
    * Parameters:
    *       -
    * Preconditions: 
    *       - The image to be used needs to be stored in the selected file state
    * Postconditions:
    *       - The image will be stored in image as a base 64 byte array and are ready 
    *         be inserted into to the database 
    *---------------------------------------------------------------------------------------------------------------------*/ 
    async handleUpload( event ){
        const reader = new FileReader();
        var r;
        reader.readAsDataURL( this.state.selectedFile );
        reader.onload = function () {
            r = reader.result.split(',')[1];
        };
        
        setTimeout( function( ) {
            this.setState( { image: r } );
        }.bind( this ), 500 );
        
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }; 
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Function: render takes care of rendering all component elements to the screen. Here we define the modal table's
    * columns and handle any actions that will be included in the columns. Then the return includes all JSX/HTML components
    * and their formatting. In this portion we define the table, modal, and form that will be used in the page. 
    *---------------------------------------------------------------------------------------------------------------------*/ 
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
                        <Button onClick={ () => this.usePrevious( record.productId ) }>Select</Button>
                    ) : null,
            },
        ];
        return (
            <div className="product-container">
                <h2 className="page-title"> Add a Product </h2>
                <Modal
                    title="Previous Products"
                    centered
                    width='60%'
                    destroyOnClose={true}
                    visible={ this.state.visable }
                    onOk={ () => this.setVisable( false ) }
                    onCancel={ () => this.setVisable( false ) }>
                            
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
                </Modal>
                    <Button 
                        onClick={ () => this.setVisable( true ) }>Use Previous Product</Button>
                
                <Form>
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
                            onChange={(event) => this.handleInputChange(event) } maxLength="255"/>
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
                    
                    <Row>
                    <Col xs={{ span:15, offset:1}}
                        lg={{span:6, offset:1}}>
                    
                        <input type="file" onChange={ this.fileChangedHandler }></input>
                    
                    </Col>

                    <br/>

                    <Col xs={{ span:15, offset:1}}
                        lg={{span:6, offset:5}}>
                        <Button 
                        onClick={ this.handleUpload }>Upload!</Button>
                    </Col>

                    </Row>






                    <FormItem >
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            onClick = { this.handleSubmit}> Add </Button>
                    </FormItem>
                    <br/>
                    <FormItem>
                        <Button
                            type="danger" ghost
                            htmlType="button"
                            size="large"
                            className="back-button"
                            onClick={ this.handleBackClick("/campaigns")}> Cancel </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedDemo = Form.create({ name: 'validate_other' })(addProduct);
ReactDOM.render(<addProduct />, document.getElementById('root'));        
export default WrappedDemo;

