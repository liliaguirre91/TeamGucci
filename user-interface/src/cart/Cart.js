import React from 'react';
//import { Link } from 'react-router-dom';
import { getCartProducts } from '../repository';
import CartItem from './CartItem';

class Cart extends React.Component {
      constructor(props) {
        super(props);
        this.state = { products: [], total: 0 }
      }
      
      
      
}

export default Cart;

