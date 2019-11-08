import React from 'react';
import ReactDOM from 'react-dom';
//import NameForm from './NameForm';
//import DeliveryInfo from './DeliveryInfo';
//import CreateAccount from './CreateAccount';

import CreateAdmin from './CreateAdmin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateAdmin />, div);
});
