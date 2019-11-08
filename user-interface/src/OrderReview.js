import React from 'react';
import ReactDOM from 'react-dom';

class OrderReview extends React.Component {
  constructor(props) {
    super(props);
    this.var = {  name:    { value: '' },
                  phone: '' 
//                  address: '',
//                  id:''
   };

//name = 'A NAME IS HERE';
//const phone = ' SOME PHONE NUMBER ';
//var address = '';
//var city = '';
//var st = '';
//var zipCode = '';
}



  render() {

      const name  = this.var.name.value;
      //const phone  = this.var.phone.value;
      const phone  = "PHONE NUMBER"

            
    return (
      <form align="center"> 
	<h1> Order Review </h1>
	<h2> ( Please review that all the information is correct. ) </h2>
	<br/>
	<h3> Your Information: </h3>
	
	<div>
	Name: { name }
	</div>

	<br/>
	
	<div>
	Phone: { phone }
	</div>
	
	Email: email@email.com
	<br/>
	Address: 1234 Somewhere Dr.
	<br/>
	<br/>
	<br/>
	<h3> Your Order: </h3>
	Luminaries: 20
	<br/>
	Price: $15
	<br/>
	
	
         <input type="submit" value="Go Back" /> 
         <input type="submit" value="Continue" />



      <script src="https://www.paypal.com/sdk/js?client-id=sb"></script>
      <script>paypal.Buttons().render('body');</script>
         
      </form>


    );
  }
}


ReactDOM.render(
  <OrderReview />,
  document.getElementById('root')
);

export default OrderReview;
