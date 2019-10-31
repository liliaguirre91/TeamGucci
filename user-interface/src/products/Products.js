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
        //let cart = localStorage.getItem('cart');
        this.props.history.push("/delivery-form");
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
    /* <div className="Products">
                <h2> Product names </h2>
                {products.map(product =>
                    <div key={product.product}>
                        {product.product}
                    </div>
                )}
                <h2> Product prices </h2>
                {products.map(product =>
                    <div key={product.price}>
                        {product.price}
                    </div>
                )}
                <h2> Product images </h2>
                {products.map(product =>
                    <div key={product.image}>
                        <img src={'data:image/jpg;base64, ${product.image}'}/>
                    </div>
                )}
            </div>
        );*/
    /*<form align="center" onSubmit={this.handleSubmit}> 
                <h1> What we offer: </h1>
                <div>
                    
                    <img src={logo} 
                    class="center" 
                    alt="logo" 
                    height={240} 
                    width={240}/>
                    <br/>
                        This is a complete luminary. 
                    <br/>
                        It includes the paper bag and the candle.
                    <br/><br/>
                        Price: $15
                    <br/>
                        Quantity: 20
                    <br/>
               
                    <input onChange="{handleProductChange}" 
                      type="checkbox" 
                      name="product" 
                      value="luminary"/> 
                        SELECT THIS PRODUCT
                    <br/><br/>
                </div>
                <input type="submit" value="Continue" />
            </form>*/
}

ReactDOM.render(
    <Products />,
    document.getElementById('root')
);

export default Products;
