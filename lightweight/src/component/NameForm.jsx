import React from 'react';
import ReactDOM from 'react-dom';
import UserDataService from "../service/UserDataService.js";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: '',
                  id:''
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
    
    event.preventDefault();
    const { name } = this.state;
    const { email } = this.state;
    alert('A name and email were submitted: ' + name + ' ' + email);
    /*UserDataService.retrieveUserInfo(name, email)
      .then((res) => {
         let user = res.data.result;
         this.setState({
            id: user.name
         })
      });
    //const { id } = this.state;*/
    this.props.history.push( "user/" + name + "/" + email);
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
