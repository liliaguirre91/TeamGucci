import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import NameForm from './component/NameForm';

class App extends React.Component {
   render() {
      return (
         <div className="container">
            <NameForm />
         </div>
      );
   }
}

export default App;
