import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';

import { sort } from '../../utils';

interface Currencies {
  order: string;
  list: List[];
}

interface List {
  currency: string;
  prices: number[];
  sharpeRatio: number;
	avgDailyReturn: number;
};

interface TableProps {
  currencies: List[];
};

function Table(props: TableProps) {
  const [currencies, setCurrencies] = useState<Currencies>({ order: '', list: [] });

  useEffect(() => {
    const adjustedCurrencies = props.currencies.map(currency => {
			const sharpeRatio = (math.mean(currency.prices) / math.std(currency.prices));
			const avgDailyReturn = currency.prices.reduce((acc: number, val: number) => acc + Number(val), 0);

      return {
        ...currency,
        sharpeRatio,
				avgDailyReturn: avgDailyReturn / currency.prices.length,
      };
    });

    setCurrencies({
      order: '',
      list: adjustedCurrencies,
    });
  }, [ props.currencies ]);

  function onSort(label: string, order: string): void {
    const sortedCurrencies = sort(label, order, currencies.list);

    setCurrencies({
      order,
      list: sortedCurrencies
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
							<div className="th-content">
								Currency
								<div>
									<button onClick={() => onSort('currency', 'asc')}>
										<small>
											ASC
										</small>
									</button>
									<button onClick={() => onSort('currency', 'desc')}>
										<small>
											DESC
										</small>
									</button>
								</div>
							</div>
            </th>
            <th>
							<div className="th-content">
								Reward to Ratio
								<div className="th-actions">
									<button onClick={() => onSort('sharpeRatio', 'asc')}>
										<small>
											ASC
										</small>
									</button>
									<button onClick={() => onSort('sharpeRatio', 'desc')}>
										<small>
											DESC
										</small>
									</button>
								</div>
							</div>
            </th>
            <th>Avg. Daily Return</th>
          </tr>
        </thead>
        <tbody>
          { currencies.list.map((currency, index) => (
              <tr key={`currency_${index}`}>
                <td>{currency.currency}</td>
                <td>{currency.sharpeRatio}</td>
                <td>{currency.avgDailyReturn}</td>
              </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;

