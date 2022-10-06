import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchApi from '../services/API';

function StarWarsProvider({ children }) {
  const [fixedResults, setFixedResults] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const apiResults = await fetchApi();
      const filterResults = apiResults.filter((item) => delete item.residents);
      setFixedResults(filterResults);
      setResults(filterResults);
    };
    getApi();
  }, []);

  const value = {
    fixedResults,
    results,
    setResults,
  };

  return (
    <StarWarsContext.Provider value={ value }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;
