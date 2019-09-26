import React from 'react';
import ReactDOM from 'react-dom';
import UserDataService from "../service/UserDataService.js";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: ''
   };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.loadUser = this.saveUser.bind(this);
  }
  
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    this.props.history.push("name/email");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
         <h1> User Query</h1>
         <label>
            Full name: <br/>
            <input type="text" value={this.state.value}  onChange={this.handleNameChange} /> <br/>
         </label>
         <label>
            Email: <br/>
            <input type="text" value={this.state.value} onChange={this.handleEmailChange} /> <br/><br/>
         </label>
         
         <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);

export default NameForm;
