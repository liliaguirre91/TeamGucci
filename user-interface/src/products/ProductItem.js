/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created:
 * Description: The ProductItem class components renders a single product to the screen. Each product and its related information is 
 * passed to the component from the Products component, which takes care of the HTTP request to the API and receives the
 * product information from the database. The products component, then passes each of the retrieved products to this
 * compnent, which then takes care of extracting all information and rendering it to the screen. This component also
 * takes care of creating a shopping cart, as well as adding and removing products from the cart. Each product is 
 * contained within a single card that contains the necessary buttons. The component includes a single state quantity 
 * that will be modified as a product is added or removed from the cart. The main handlers/function s in this component are:
 *      - handleInputChange
 *      - addToCart
 *      - removeFromCart
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import { notification, message, Button, Input, Card, Row, Col } from 'antd';
import './ProductItem.css';


class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {quantity: 1}
    }

    /*---------------------------------------------------------------------------------------------------------------------
     * Handler: handleInputChange handles the change of state of the product's quantity. The handlers takes an event, in
     * this case the user's input in the quantity box and sets the quantity state to that value. 
     *---------------------------------------------------------------------------------------------------------------------*/
    handleInputChange = event => 
        this.setState({[event.target.name]: event.target.value})
    
    /*---------------------------------------------------------------------------------------------------------------------
     * Function: addToCart creates a cart if one doesn't already exist and adds the specified product and quantity to the
     * cart. 
     * Parameters: None
     * Preconditions: 
     *      - The quantity box must not be empty
     *      - Quantity must not be negative
     *      - Quantity must not be a decimal
     * Postconditions:
     *      - The specified product will be added to the cart with the specifiec quantity. 
     *      - A message will be displayed stating how many of the given product are in the cart after the addition.
     *---------------------------------------------------------------------------------------------------------------------*/
    addToCart = () => {
        let cart = localStorage.getItem('cart') 
                 ? JSON.parse(localStorage.getItem('cart')) : {};
        let id = this.props.product.productId.toString();
        cart[id] = (cart[id] ? cart[id]: 0);
        let qty = cart[id] + parseInt(this.state.quantity);

        //Prevent negative numbers from adding to cart
        if (parseInt(this.state.quantity) > 0) {

            cart[id] = qty
            localStorage.setItem('cart', JSON.stringify(cart));
            notification.success({
                message: 'LCHS Band Fundraising',
                description: "Your cart contains " + qty + " of product " + this.props.product.product.toString()
            });
        }

        else {
            notification.error({
                message: 'Error inputting product',
                description: 'Please only enter positive numbers greater than 0.'
            });
        }
    }
    
    /*---------------------------------------------------------------------------------------------------------------------
     * Function: removeFromCart removes the specified product completely from the cart. This function does not use the 
     * entered quantity, but instead removes it completely.
     * Parameters: 
     *      - product object conatining all product information
     * Preconditions: 
     *      - Cart must not be null
     * Postconditions:
     *      - The product represented by the parameter will be completely removed form the cart.
     *---------------------------------------------------------------------------------------------------------------------*/
    removeFromCart = (product) => {
        if (localStorage.getItem('cart') !== null) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let id = this.props.product.productId.toString();
            if (cart[id] !== undefined) {
                delete cart[id];
                notification.success({
                    message: 'LCHS Band Fundraising',
                    description: "Item " + this.props.product.product.toString() + " has been completely removed from your cart."
                });
                if (Object.keys(cart).length > 0) {
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                else 
                    localStorage.removeItem('cart');
            }
            else {
                message.error('This product is not in the cart!! Nothing to Remove!!', 5);
            }
        }
        else {
            message.error('Your cart is empty!! Nothing to Remove!!', 5);
        }
        
    }
    
    render() {
        const { product } = this.props;
        return (
            <div align="center">
            <Card 
                align="center"
                marginBottom="10px"
                style={{ width: "50%"}} 
                >
                <div>
                    <h4 align="center">{product.product}</h4><br/>
                
                   <img className="image" src={`data:image/jpg;base64, ${product.image}`} height={500} width={500} /><br/> 
                    
                    <div>
                    <h5><small>price: </small>${product.price}</h5>
                    <h6>{product.description}</h6><br/>
                    </div>
                    <div align="right">
                         <Row gutter={[10, 24]}>
                            <Col span={16}>
                                <Input type="number" value={this.state.quantity} min="1" name="quantity" 
                                    onChange={this.handleInputChange} align="left" className="quantity-input" 
                                    style={{ width: "60px", marginRight: "10px", borderRadius: "1px"}}/>
                            </Col>
                        </Row>
                        <Row gutter={[4, 20]}>
                            <Col span={16}>
                                <Button className="add-button" size="small"
                                    onClick={this.addToCart}>Add product</Button> <br/>
                            </Col>
                        </Row>
                        <Row gutter={[4, 20]}>
                            <Col span={18}>
                                <Button className="remove-button"  type="danger" size="small"
                                    onClick={this.removeFromCart}>Remove This Product</Button>
                            </Col>
                        </Row>
                        
                        
                    </div>
                </div>
            </Card>
            </div>
           
        )
    }
}


export default ProductItem;
