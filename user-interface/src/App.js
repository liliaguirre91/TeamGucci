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
import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout, notification } from 'antd';
const { Content } = Layout;

//import Button from 'react-bootstrap/Button'; {/* imports button styles and functions */}

{/* Button class for all attributes of buttons*/}
/*class Button extends React.Component{

   render(){
      const{
      color, variant, content, ...others
      } = this.props;

      return(
      <button className={color}{...others}>
      {content}
      </button>
      )
   }
}*/



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
            duration: 3,
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
                            <Route path="/order-lookup" component={ OrderLookup }></Route>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
    

                            
                            
     /*const routing = (
   <Router>
      <div>
         <ul>
            <li>
               <Link to="/">Home</Link>
            </li>
         </ul>
         <Route exact path="/" component={HomePage} />
         <Route path="/order-lookup" component={OrderLookup} />
         <Route path="/signup" component={CreateAccount} />
         <Route path="/login" component={Login} />
         <Route path="/products" component={Products} />
         <Route path="/delivery-form" component={DeliveryInfo} />
      </div>
   </Router>
)                       
                            
                            
 /* handleSubmit(event) {
//    
//    event.preventDefault();
//    const { name } = this.state;
//    const { email } = this.state;
//    alert('A name and email were submitted: ' + name + ' ' + email);
//    
//    /*UserDataService.retrieveUserInfo(name, email)
//      .then((res) => {
//         let user = res.data.result;
//         this.setState({
//            id: user.name
//         })
//      });
//    //const { id } = this.state;
//    this.props.history.push( "user/" + name + "/" + email);
}*/
   
   /*****************************************************************************************
    * Handler: handleClick - This handler will route the application to other existing pages.
    * This handler will be called on the button's click. 
    * Parameters: This handler takes one parameter representing the URL extension where the
    * page that will be accesses will be located.
    * Preconditions: None
    * Postconditions: The user will be rerouted to the correct page
    **************************************************************************************/
   /*handleClick = param => e => {
      e.preventDefault();
      this.props.history.push(param);
   }

   clicked(){
      console.log("button was clicked");
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit}> 
            <h1 align="center"> Welcome to the Las Cruces High School Band Luminary Fundraiser  </h1> 
            <div>
                  <img src={logo} class="center" alt="logo" 
                  height={150}
                  width={150}/><br/>
                  <br/><br/>
            </div>
            <div> 
               <button class="center" onClick={ this.handleClick("/products") }> View Products </button> <br/>
               <button class="center" onClick={ this.handleClick("/login") }> Login </button> <br/>
               <button class="center" onClick={ this.handleClick("/signup") }> Create Account </button> <br/>
               <button class="center" onClick={(e) => { e.preventDefault(); this.clicked()} }> Account </button> <br/>
               <button class="center" onClick={ this.handleClick("/order-lookup") }> Order search </button> <br/>
            </div>
         </form>
      );
   }*/
}


/*ReactDOM.render(
  <HomePage/>,
  document.getElementById('root')
);*/



export default withRouter(App); //I COMMENTED THESE OUT TO MAKE IT RUN IN THE WEB BROWSER

               
         { /* <h3 align="center"> What would you like to do? </h3>*/}
         {/*<button class="center"  onClick={(e) => { e.preventDefault(); this.clicked()} }> Products </button> <br/>*/}

{/*
<Button content="Sample Button" variant="green" />
<button type="button" class="btn btn-primary" > DID IT WORK </button>
*/}
{/*

         <label>
            Full name: <br/>
            <input type="text" value={this.state.value}  onChange={this.handleNameChange} /> <br/>
         </label>
         <label>
            Email: <br/>
            <input type="text" value={this.state.value} onChange={this.handleEmailChange} /> <br/><br/>
         </label>
         
         <input type="submit" value="Submit" />

*/}
