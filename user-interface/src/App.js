import React from 'react';
import './HomePage.css';
import { 
    Route, 
    withRouter, 
    Switch 
} from 'react-router-dom'

import { ACCESS_TOKEN } from './constants';
import { getCurrentUser, getCampaign } from './util/APIFunctions';

import HomePage from './HomePage';
import OrderLookup from './OrderLookup';
import Login from './user/login/Login.js';
import CreateAccount from './user/signup/CreateAccount.js';
import Products from './products/Products.js';
import DeliveryInfo from './DeliveryInfo.js';
import AppHeader from './common/AppHeader';
import LoadingIndicator from './common/LoadingIndicator';
import PayPalPage from './paypal/PayPalPage.js';
import OrderReview from './OrderReview.js';
import AdminAccountPage from './user/account/admin/AdminAccountPage.js';
import CustomerAccountPage from './user/account/customer/CustomerAccountPage.js';
import CreateAdmin from './user/account/admin/CreateAdmin.js';
import CampaignsPage from './user/account/admin/Campaign.js';
import DeliveryReport from './user/account/admin/DeliveryReport.js';
import OrdersReport from './user/account/admin/OrdersReport.js';
import AddProduct from './user/account/admin/addProduct.js';

import EditInfo from './user/account/EditInfo.js';
import CustomerOrders from './user/account/customer/CustomerOrders.js';


import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './footer_logo.png';

import ModifyProduct from './user/account/admin/ModifyProduct.js';
import ResetPassword from './user/account/admin/ResetPassword.js';
import ProductsOrdered from './user/account/admin/ProductsOrdered.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderConfirmation from './OrderConfirmation';
import FailurePage from './FailurePage';
import { Layout, notification, Icon } from 'antd';
const Footer = Layout.Footer;





const { Content } = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    currentUser: null,
                    isAuthenticated: false,
                    isLoading: false,
        }

        
        //this.handleClick = this.handleClick.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.loadCurrentCampaign = this.loadCurrentCampaign.bind(this);
        
        notification.config({
            placement: 'topLeft',
            top: 70,
            duration: 5,
        });
  }
  
    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
        .then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
                isLoading: false
            });
        }).catch(error => {
                this.setState({
                    isLoading: false
                });  
        });
    }
    async loadCurrentCampaign() {
        await getCampaign()
        .then( response => {
            localStorage.setItem( 'campaign', ( JSON.parse( response ) ) );
        });
        console.log(localStorage.getItem( 'campaign' ));
    }
  
    componentDidMount() {
        this.loadCurrentUser();
        this.loadCurrentCampaign();
    }
    
    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);
    
        notification[notificationType]({
            message: 'LCHS Band Fundraising',
            description: description,
        });
    }
    
    handleLogin() {
        notification.success({
            message: 'LCHS Band Fundraising',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

  
    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />
        }
        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={this.state.isAuthenticated} 
                    currentUser={this.state.currentUser} 
                    onLogout={this.handleLogout} />

                <Content className="app-content">
                    <div className="container">
                        <Switch>      
                            <Route exact path="/"
                                render={(props) => <HomePage isAuthenticated={this.state.isAuthenticated} 
                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/login" 
                                render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                            <Route path="/signup" component={ CreateAccount }></Route>
                            <Route path="/products"
                                 render={(props) => <Products isAuthenticated={this.state.isAuthenticated} 
                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/delivery-form"
                                 render={(props) => <DeliveryInfo isAuthenticated={this.state.isAuthenticated} 
                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/paypal"
                                 render={(props) => <PayPalPage isAuthenticated={this.state.isAuthenticated} 
                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/order-review"
                                 render={(props) => <OrderReview isAuthenticated={this.state.isAuthenticated} 
                                    currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/admin-account"
                                render={(props) => <AdminAccountPage isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/user-account"
                                render={(props) => <CustomerAccountPage isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/admin-create-admin"
                                render={(props) => <CreateAdmin isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/campaigns"
                                render={(props) => <CampaignsPage isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/reset-password"
                                render={(props) => <ResetPassword isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/delivery-report"
                                render={(props) => <DeliveryReport isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/orders-report"
                                render={(props) => <OrdersReport isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/add-product"
                                render={(props) => <AddProduct isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/modify-product"
                                render={(props) => <ModifyProduct isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/order-lookup" component={ OrderLookup }></Route>
                            <Route path="/products-ordered"
                                render={(props) => <ProductsOrdered isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/order-confirmation"
                                render={(props) => <OrderConfirmation isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/failure-page"
                                render={(props) => <FailurePage isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/edit-info"
                                render={(props) => <EditInfo isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/all-orders"
                                render={(props) => <CustomerOrders isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{position:"sticky", bottom:"0"}}>
                <div style={{ background: "#020e19" }}>.</div>
                <div style={{ background: "#020e19" }}>.</div>

                 
                </Footer>
            </Layout>
        );
    }
}
//<Icon component={() => (<img src="./footer-logo.png"/>)}/>

export default withRouter(App); //I COMMENTED THESE OUT TO MAKE IT RUN IN THE WEB BROWSER
