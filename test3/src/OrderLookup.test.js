import React from 'react';
import ReactDOM from 'react-dom';
import OrderLookup from './OrderLookup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderLookup />, div);
  ReactDOM.unmountComponentAtNode(div);
});
