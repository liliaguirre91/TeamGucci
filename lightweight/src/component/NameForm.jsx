import React from 'react';
import ReactDOM from 'react-dom';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  lastName: ''
   };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  
  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
      <h1> User Query</h1>
         <label>
            First name: <br/>
            <input type="text" value={this.state.value}  onChange={this.handleNameChange} /> <br/>
         </label>
         <label>
            Last name: <br/>
            <input type="text" value={this.state.value} onChange={this.handleLastNameChange} /> <br/><br/>
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
