import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './addProduct.css';
import {
  Form,
  Input,
  Button,
  Modal,
  Table,
  notification,
  Row,
  Col
} from 'antd';
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
 
    handleSubmit = e => {
        e.preventDefault();
        if( this.state.image === [] ){
            return;
        }
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });

        const camp = JSON.parse(localStorage.getItem( 'setCampaign' ));
        console.log (camp.year);
        const price  = this.state.price.value.split('.');
        const newProduct = {
            product: this.state.product.value,
            price: price[0],
            description: this.state.description.value,
            image: this.state.image,
            yearRan: camp.year
        };
      
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

handleBackClick = param => e => {
    e.preventDefault();
    this.props.history.push(param);
 }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    
    async setVisable( b ) {
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
        this.setState( { visable: b } );
    }
 

    async usePrevious( productId ){
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
            
        const camp = JSON.parse(localStorage.getItem( 'setCampaign' ));
        newProduct.yearRan = parseInt( camp.year );
            
        await createProduct(newProduct)
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

    async handleUpload( event ){
        const reader = new FileReader();
        var r;
        reader.readAsDataURL( this.state.selectedFile );
        reader.onload = function () {
            r = reader.result.split(',')[1];
        };
        
        setTimeout( function( ) {
            this.setState( { image: r } );
            console.log( r );
        }.bind( this ), 500 );
        
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }; 
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
                    <FormItem label="Upload">
                        <input type="file" onChange={ this.fileChangedHandler }></input>
                        <button onClick={ this.handleUpload }>Upload!</button>
                    </FormItem>
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

