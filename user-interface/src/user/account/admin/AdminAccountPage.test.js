import React from 'react';
import ReactDOM from 'react-dom';
import AdminAccountPage from './AdminAccountPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminAccountPage />, div);
});
