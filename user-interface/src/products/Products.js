import React from 'react';
import ReactDOM from 'react-dom';
//import logo from './luminary.jpg';
import ProductItem from './ProductItem.js';
import DeliveryInfo from '../DeliveryInfo.js';
import { getProducts } from '../util/APIFunctions';
import './Products.css';



class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    componentDidMount() {
        /* This removes the cart every time the user accesses the products page to prevent corrupted cart.
         * Will be removed if persisten cart is implemented*/
        localStorage.removeItem('cart');
        getProducts().then((products) =>this.setState({ products }));
    }

   
    handleSubmit(event) {
        event.preventDefault();
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
            this.props.history.push("/paypal");
        }
    }

    render() {
        const{ products } = this.state;
        return (
            <div className="product-container">
                <h3 className="page-title"> List of Products </h3><hr/>
                { products.map((product, index) => <ProductItem product={product} key={index}/>)}
                <hr/>
                 <button className="btn btn-primary float-right"
                    style={{  marginRight: "10px" }} 
                    onClick={(e) => this.handleSubmit(e) }> Next </button><br/><br/>
            </div>
            );
    }
}

ReactDOM.render(
    <Products />,
    document.getElementById('root')
);

export default Products;
