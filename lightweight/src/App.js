import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NameForm from './component/NameForm';

function App() {
   return (
      <div className="container">
         <Router>
            <div className="col-md-6">
               <h1 className="text-center" style={style}>Lightweight Prototype</h1>
               <Switch>
                  <Route path="/" exact component={NameForm}/>
                  <Route path="/name/email"/>
               </Switch>
            </div>
         </Router>
      </div>
   );
}

const style = {
   color: 'red',
   margin: '10px'
}

export default App;
