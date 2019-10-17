import React from 'react';
import ReactDOM from 'react-dom';

import logo from './luminary.jpg';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {OrderID: ''

   };


   // this.handleIDChange = this.handleIDChange.bind(this);
    
  //  this.handleSubmit = this.handleSubmit.bind(this);
    //this.loadUser = this.saveUser.bind(this);
  }


//handleIDChange(event) {
//  this.setState({OrderID: event.target.value});
//}

  handleSubmit(event) {
    
    event.preventDefault();
   // alert('Your information was submitted :)');
  }


render() {
  return (
      <form align="center" onSubmit={this.handleSubmit}> 
         <h1> What we offer: </h1>
<div>
      {/* LOGO */}
        <img src={logo}
        class="center"
        alt="logo" 
        height={240}
        width={240}/>
		<br/>
       
        This is a complete luminary. <br/>
        It includes the paper bag and the candle.
        <br/><br/>
        Price: $15
        <br/>
        Quantity: 20
        <br/>
        
        <input 
        onChange="{handleProductChange}"
        type="checkbox"
        name="product"
        value="luminary"
        /> SELECT THIS
        <br/><br/>
</div>
         
         <input type="submit" value="Continue" />
      </form>
    );
  }
}

ReactDOM.render(
  <Products />,
  document.getElementById('root')
);

export default Products;
