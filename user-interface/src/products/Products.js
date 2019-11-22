import React from 'react';
import ReactDOM from 'react-dom';
//import logo from './luminary.jpg';
import ProductItem from './ProductItem.js';
import { getProducts } from '../util/APIFunctions';
import { message, Form, Input, Button } from 'antd';
import './Products.css';

const FormItem = Form.Item;
class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            phone:   { value: '' },
            submitted: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    
    componentDidMount() {
        /* This removes the cart every time the user accesses the products page to prevent corrupted cart.
         * Will be removed if persisten cart is implemented*/
        //localStorage.removeItem('cart');
        console.log(localStorage.getItem('cart'));
        let campaign = localStorage.getItem( 'campaign' );
        console.log(campaign);
        getProducts(campaign).then((products) =>this.setState({ products }));
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        
        this.setState ({
           [inputName] : {
              value: inputValue,
              ...validationFun(inputValue)
           }
        });
        this.setState( { submitted: true } );
     }
    
    handleSubmit(event) {
        event.preventDefault();
        if (localStorage.getItem('cart') === null) {
            message.error('Your cart is empty!! Cannot continue!!', 7);
        }
        else {
            let user_role = '';
            if (this.props.currentUser) {
                let currentUser = this.props.currentUser;
                user_role = currentUser.role;
                console.log(user_role);
            }
            
            if (user_role === 'Role_ADMIN' || user_role === 'Role_ROOT') {
                this.props.history.push("/delivery-form");
            }
            else {
                localStorage.setItem( 'Phone', this.state.phone.value );
                this.props.history.push("/paypal");
            }
        }
    }

    render() {
        let user_role = '';
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            user_role = currentUser.role;
            console.log(user_role);
        }
        //localStorage.removeItem('cart');
        const{ products } = this.state;
        return (
            <div className="product-container">
                <h3 className="page-title"> List of Products </h3><hr/>
                { products.map((product, index) => <ProductItem product={product} key={index}/>)}
                <hr/>
                {user_role !== 'Role_ADMIN' && user_role !== 'Role_ROOT' &&
                    <Form className = 'Phone_number'>
                        <FormItem
                            label="Phone"
                            validateStatus={this.state.phone.validateStatus}
                            help={this.state.phone.errorMsg}>
                            <Input
                                name="phone"
                                placeholder="##########"
                                maxLength="10"
                                value={ this.state.phone.value }
                                onChange={(event) => this.handleInputChange(event, this.validatePhone) }/>
                        </FormItem>
                    </Form>}
                 <Button className="btn btn-primary float-right"
                    style={{  marginRight: "10px" }} 
                    disabled = {(user_role === 'Role_USER' || this.props.currentUser === null) && !this.state.submitted}
                    onClick={(e) => this.handleSubmit(e)}> Next </Button><br/><br/>
            </div>
            );
    }
    
validatePhone = (phone) => {
    if(phone.length > 10) {
        return{
            validateStatus: 'error',
            errorMsg: 'Invalid phone number. Please enter the phone number in the shown format.'
        }
    } else {
        return{
            validateStatus: 'success',
            errorMsg: null,
            };
        }
    }
}
ReactDOM.render(
    <Products />,
    document.getElementById('root')
);

export default Products;
