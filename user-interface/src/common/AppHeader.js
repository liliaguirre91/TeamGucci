import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home" className="nav-icon" />
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
            <Header className="app-header">
            <div className="container">
                <div className="app-title" >
                    <Link to="/">Home</Link>
                </div>
                <Menu
                    className="app-menu"
                    mode="horizontal"
                    selectedKeys={[this.props.location.pathname]}
                    style={{ lineHeight: '64px' }} >
                    {menuItems}
                </Menu>
                </div>
            </Header>
        );
    }
}

function AccountDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="account-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="email-info">
                    @{props.currentUser.email}
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

