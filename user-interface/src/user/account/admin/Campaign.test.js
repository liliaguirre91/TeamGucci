import React from 'react';
import ReactDOM from 'react-dom';
import Campaign from './Campaign';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Campaign />, div);
  ReactDOM.unmountComponentAtNode(div);
});
