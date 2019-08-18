import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

it('renders the Header component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

