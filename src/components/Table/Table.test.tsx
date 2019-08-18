import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

interface List {
  currency: string;
  prices: number[];
  sharpeRatio: number;
	avgDailyReturn: number;
};

const currencies = [
  {
    currency: 'BTC',
    prices: [10000, 20000],
    sharpeRatio: 0.999,
    avgDailyReturn: 0.50,
  },
  {
    currency: 'ETH',
    prices: [100, 200],
    sharpeRatio: 0.999,
    avgDailyReturn: 0.50,
  },
];

it('renders the Table component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Table currencies={currencies} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// other test would include testing on click of button (sorting)
