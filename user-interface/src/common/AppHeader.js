import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css'; //NEED
import { Layout, Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css'; //NEED
const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
        this.clearCart= this.clearCart.bind(this); 
    }

    handleMenuClick({ key }) {
        if(key === "logout") {
            this.props.onLogout();
        }
    }
    
    clearCart( ) {
        localStorage.removeItem( 'cart' );
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon 
                            type="home" 
                            className="nav-icon" />
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/account" className="account-menu">
                    <AccountDropdownMenu 
                        currentUser={this.props.currentUser} 
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ]; 
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">Signup</Link>
                </Menu.Item>                  
            ];
        }
          

        return (
            <Layout className="Layout">
                <Header className="app-header">
                    <div className="container">
                        <div className="app-title" >
                            <Link to="/"><Icon component={() => (<img src={require('../LCHS_logo.png')} />)} /></Link>
                            <Link to="/products" style={{
                                paddingRight: '50px',
                                }}><span onClick = { ( ) => this.clearCart() }>Products</span></Link>
                            <Link to="/order-lookup">Order Lookup</Link>
                        </div>
                        <Menu
                            className="app-menu"
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[this.props.location.pathname]}
                            style={{ lineHeight: '64px' }} >
                            {menuItems}
                        </Menu>
                    </div>
                </Header>
            </Layout>
        );
    }
}

function AccountDropdownMenu(props) {
    var dropdownMenu;
    let user_role = props.currentUser.role;
    if( user_role === 'Role_ROOT' || user_role === 'Role_ADMIN' ){
        dropdownMenu = (
            <Menu 
                theme="dark"
                onClick={props.handleMenuClick} className="account-dropdown-menu">
                <Menu.Item key="user-info" className="dropdown-item" disabled>
                    <div className="user-full-name-info">
                        {props.currentUser.name}
                    </div>
                    <div className="email-info">
                        {props.currentUser.email}
                    </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="account" className="dropdown-item">
                    <Link to={`/admin-account`}>Account</Link>
                </Menu.Item>
                <Menu.Item key="logout" className="dropdown-item">
                    <Link to = {`/`}>Logout</Link>
                </Menu.Item>
            </Menu>
        );
    }
    else {
        dropdownMenu = (
            <Menu 
                theme="dark"
                onClick={props.handleMenuClick} className="account-dropdown-menu">
                <Menu.Item key="user-info" className="dropdown-item" disabled>
                    <div className="user-full-name-info">
                        {props.currentUser.name}
                    </div>
                    <div className="email-info">
                        {props.currentUser.email}
                    </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="account" className="dropdown-item">
                    <Link to={`/user-account`}>Account</Link>
                </Menu.Item>
                <Menu.Item key="logout" className="dropdown-item">
                    <Link to = {`/`}>Logout</Link>
                </Menu.Item>
            </Menu>
        );
    }

  return (
        <Dropdown 
            overlay={dropdownMenu} 
            trigger={['click']}
            getPopupContainer = { () => document.getElementsByClassName('account-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
            </a>
        </Dropdown>
  );
}

export default withRouter(AppHeader);

