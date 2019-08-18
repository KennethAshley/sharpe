import React, { useEffect, useState } from 'react';
import 'whatwg-fetch';

import {
  queryString,
  fetchResults,
} from './utils';

import Header from './components/Header';
import Logo from './logo.svg';
import './App.css';

interface RequestParams {
  [key: string]: string | undefined;
  start: string;
  end: string;
};

const key: string | undefined = process.env.REACT_APP_NOMICS_API_KEY;
const baseUrl: string = 'https://api.nomics.com/v1/currencies/sparkline';

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [params] = useState<RequestParams>({
    start: '2018-08-17T00%3A00%3A00Z',
    end: '2019-08-17T00%3A00%3A00Z',
  });

  useEffect(() => {
    const getSparkline = async () => {
      const query = queryString({ key, ...params });
      setLoading(true);

      try {
        const results = await fetchResults(`${baseUrl}?${query}`);

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
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
