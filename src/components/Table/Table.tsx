import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';

import { sort } from '../../utils';

interface Currencies {
  order: string;
  currencies: Currency[];
}

interface Currency {
  currency: string;
  prices: number[];
  sharpeRatio: number;
	avgDailyReturn: number;
};

interface TableProps {
  currencies: Currency[];
};

function Table(props: TableProps): JSX.Element {
  const [currencies, setCurrencies] = useState<Currencies>({ order: '', currencies: [] });

  useEffect(() => {
    const adjustedCurrencies: Currency[] = props.currencies.map(currency => {
      const sharpeRatio: number = (math.mean(currency.prices) / math.std(currency.prices));
      const avgDailyReturn: number = currency.prices.reduce((acc: number, val: number) => acc + Number(val), 0);

      return {
        ...currency,
        sharpeRatio,
				avgDailyReturn: avgDailyReturn / currency.prices.length,
      };
    });

    setCurrencies({
      order: '',
      currencies: adjustedCurrencies,
    });
  }, [props.currencies]);

  function onSort(label: string, order: string): void {
    const sortedCurrencies: Currency[] = sort(label, order, currencies.currencies);

    setCurrencies({
      order,
      currencies: sortedCurrencies,
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
                  <button onClick={(): void => onSort('currency', 'asc')}>
										<small>
											ASC
										</small>
									</button>
                  <button onClick={(): void => onSort('currency', 'desc')}>
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
                  <button onClick={(): void => onSort('sharpeRatio', 'asc')}>
										<small>
											ASC
										</small>
									</button>
                  <button onClick={(): void => onSort('sharpeRatio', 'desc')}>
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
          { currencies.currencies.map((currency, index) => (
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

