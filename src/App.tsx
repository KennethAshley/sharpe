import React, { useEffect, useState } from 'react';
import { key, baseUrl } from './constants';
import 'whatwg-fetch';

import {
  queryString,
  fetchResults,
} from './utils';

import Header from './components/Header';
import Table from './components/Table';

import Logo from './logo.svg';
import './App.css';

interface RequestParams {
  readonly [key: string]: string | undefined;
  start: string;
  end: string;
};

interface Currency {
  currency: string;
  prices: number[];
  sharpeRatio: number;
	avgDailyReturn: number;
};

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  /* Due to time, a second deconstructed variable in which
   * we can name 'setParams' was ommited. We can use this
   * to update the time interval.
   */
  const [params] = useState<RequestParams>({
    start: '2018-08-17T00%3A00%3A00Z',
    end: '2019-08-17T00%3A00%3A00Z',
  });

  useEffect(() => {
    const getSparkline = async (): Promise<void> => {
      const query: string = queryString({ key , ...params });
      setLoading(true);

      try {
        const results: Currency[] = await fetchResults(`${baseUrl}?${query}`);

        setCurrencies(results);
        setLoading(false);
      } catch ({ message }) {
        setError(message);
        setLoading(false);
      }
    }

    getSparkline();
  }, [params]);

  if (isLoading) {
    return (
      <div className="loader">
        <img src={Logo} alt="Loading..." className="App-logo" />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      { error ?
        <div>Whoops! { error }</div> :
        <Table currencies={currencies} />
      }
    </div>
  );
}

export default App;
