import React from 'react';
import ReactDOM from 'react-dom';
import ProductItem from './ProductItem.js';
import { getProducts } from '../util/APIFunctions';
import { message, Form, Input, Button } from 'antd';

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

    /*---------------------------------------------------------------------------------------------------------------------
     * Function: componentDidMount is executed as soon as the component is mounted; when the application or the page itself
     * is accessed. This function takes care of retrieving the current campaign from local storage and then using it to
     * retrieve all product in the campaign and storing it in the products state.
     * Parameters: None
     * Preconditions:
     *      - A campaign must have been previously stored in local Storage.
     * Postconditions: 
     *      - All products in the campaign will have been retrieved and stored in the products state.
     *---------------------------------------------------------------------------------------------------------------------*/    
    componentDidMount() {
        let campaign = localStorage.getItem( 'campaign' );
        getProducts(campaign).then((products) =>this.setState({ products }));
    }

    /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleInputChange handles the change of state of the every one of the user's input quantity. The handler
    * takes an event, which is the user's and assigns the input value to the specified state.
    *---------------------------------------------------------------------------------------------------------------------*/
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
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleSubmit handles the submit event and after checking that the cart is not empty redirects the user to
    * the next page. If the user is an admin they are redirected to the delivery info page, and if the user is a 
    * customer they get redirected to the paypal.
    *---------------------------------------------------------------------------------------------------------------------*/
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

    /*---------------------------------------------------------------------------------------------------------------------
    * Function: render calls the ProductItem component to wrap each product in a card. It also adds an input box for 
    * customers to enter their phone number before moving on to the next page. Rendering of each product happens in the 
    * ProductItem component.
    *---------------------------------------------------------------------------------------------------------------------*/
    render() {
        let user_role = '';
        if (this.props.currentUser) {
            let currentUser = this.props.currentUser;
            user_role = currentUser.role;
        }
        const{ products } = this.state;
        
        return (
            <div>
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

/*---------------------------------------------------------------------------------------------------------------------
* Function: validatePhone validates that the phone number the user inputs is the right length before moving on to the
* next page.
*---------------------------------------------------------------------------------------------------------------------*/
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
