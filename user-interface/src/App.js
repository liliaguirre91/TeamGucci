import React from 'react';
import './HomePage.css';
import ReactDOM from 'react-dom';
import { 
    Route, 
    Link, 
    withRouter, 
    Switch 
} from 'react-router-dom'

import logo from './LCHS_logo.png';
import { ACCESS_TOKEN } from './constants';
import { getCurrentUser } from './util/APIFunctions';

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
import CreateAdmin from './user/account/admin/CreateAdmin.js';
import CampaignsPage from './user/account/admin/Campaign.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout, notification } from 'antd';

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
        
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 10,
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
  
    componentDidMount() {
        this.loadCurrentUser();
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
                            <Route path="/admin-create-admin"
                                render={(props) => <CreateAdmin isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/campaigns"
                                render={(props) => <CampaignsPage isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
                            <Route path="/order-lookup" component={ OrderLookup }></Route>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}


export default withRouter(App); //I COMMENTED THESE OUT TO MAKE IT RUN IN THE WEB BROWSER
