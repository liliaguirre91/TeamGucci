import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import HomePage from './HomePage';
import OrderLookup from './OrderLookup';
import './index.css';

//import NameForm from './NameForm';
//import * as serviceWorker from './serviceWorker';

const routing = (
   <Router>
      <div>
         <ul>
            <li>
               <Link to="/">Home</Link>
            </li>
            <li>
               <Link to="/order-lookup">Order Lookup</Link>
            </li>
         </ul>
         <Route exact path="/" component={HomePage} />
         <Route path="/order-lookup" component={OrderLookup} />
      </div>
   </Router>
)


ReactDOM.render(
  routing,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();


