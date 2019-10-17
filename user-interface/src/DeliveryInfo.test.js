import React from 'react';
import ReactDOM from 'react-dom';
import NameForm from './NameForm';
import DeliveryInfo from './DeliveryInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeliveryInfo />, div);
});
