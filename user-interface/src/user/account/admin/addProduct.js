import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './addProduct.css';
import {
  Form,
  Input,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  notification,
} from 'antd';
import { createProduct } from '../../../util/APIFunctions.js';

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
        };
      this.handleUpload = this.handleUpload.bind( this );
      this.handleInputChange = this.handleInputChange.bind(this);
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
    //console.log( this.state.image );
    const camp = JSON.parse(localStorage.getItem( 'setCampaign' ));
    console.log (camp.year);
    const newProduct = {
      product: this.state.product.value,
      price: this.state.price.value,
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
          this.props.history.push("/admin-account"); //for now will redirect to home, later to confirmation
      })
      .catch(error => {
          notification.error({
              message: 'LCHS Band Fundraising',
              description:error.message || 'Sorry! Something went wrong!'
          });
      });
  };

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
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
    return (
    <div className="product-container">
        <h2 className="page-title"> Add a Product </h2>
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

            <FormItem label="Upload">
              <input type="file" onChange={ this.fileChangedHandler }></input>
              <button onClick={ this.handleUpload }>Upload!</button>
            </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit" onClick = { this.handleSubmit}>
            Add
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const WrappedDemo = Form.create({ name: 'validate_other' })(addProduct);
ReactDOM.render(<addProduct />, document.getElementById('root'));        
export default WrappedDemo;


//const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);
/*ReactDOM.render(
    <AddProduct/>,
    document.getElementById('root')
  );
export default AddProduct;
*/
