import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    users: []
  };

  async componentDidMount() {
    const response = await fetch('/api/users');
    const body = await response.json();
    this.setState({ users: body, isLoading: false });
  }

  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>User List</h2>
            {users.map(user =>
              <div key={user.name}>
                {user.name}
                
              </div>
            )}
          </div>
          <div className="App-intro">
            <h2>Email List</h2>
            {users.map(user =>
              <div key={user.email}>
                {user.email}
                
              </div>
              
              
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;