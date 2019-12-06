/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created:
 * Description: The AppHeader class component renders a header that will be persistent through all pages in the website.
 * This header will contain a link two links to home, a link to the products page, a link to the order lookup page, and 
 * a couple other links depending on whether the user is logged in or not. If the user is not logged in, then the header
 * contains a link to th elogin page and a link to the signup page. If the user is logged in then the header contains
 * a small menu showing the name and email for the user, and giving them the choice to go to their account page or logout.
 * The main handlers/function s in this component are:
 *      - handleMenuClick
 *      - clearCart
 *      - render
 *---------------------------------------------------------------------------------------------------------------------*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AppHeader.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
        this.clearCart= this.clearCart.bind(this); 
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Handler: handleMenuClick calls the onLogout prop if the key id set to logout. This logs the user out.
    *---------------------------------------------------------------------------------------------------------------------*/
    handleMenuClick({ key }) {
        if(key === "logout") {
            this.props.onLogout();
        }
    }
    
   /*---------------------------------------------------------------------------------------------------------------------
    * Function: clearCart removes the cart from local storage .
    *---------------------------------------------------------------------------------------------------------------------*/
    clearCart( ) {
        localStorage.removeItem( 'cart' );
    }

   /*---------------------------------------------------------------------------------------------------------------------
    * Function: render defines the menu on the right side of the header based on if the user is logged in and defines the
    * necessary links for it. This also includes the dropdown menu define further down in the the file. The return 
    * portion defined the actual header along with its formatting, and the links found on the left side of the header. 
    *---------------------------------------------------------------------------------------------------------------------*/
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
                        </div>
                        <div className="app-links">
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

/*---------------------------------------------------------------------------------------------------------------------\
 * Date Created:
 * Description: The AccountDropdownMenu function defines and renders the dropdown menu for the user. The route to the 
 * account page will be determined based on the user role (admin or customer). This menu includes a link to the account
 * page and th elogout fucntionality. 
 *---------------------------------------------------------------------------------------------------------------------*/
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
    
    /* Defines the navigation icons */ 
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

