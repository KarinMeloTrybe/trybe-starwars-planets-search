import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchApi from '../services/API';

function StarWarsProvider({ children }) {
  const columns = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [fixedResults, setFixedResults] = useState([]);
  const [results, setResults] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState(results || []);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0 });
  const [activeFilters, setActiveFilters] = useState([]);
  const [availableColumns, setAvailableColumns] = useState(columns);

  useEffect(() => {
    setAvailableColumns(columns.filter((column) => !activeFilters
      .map((filter) => filter.column).includes(column)));
  }, [activeFilters]);

  useEffect(() => {
    setFilters({ column: availableColumns[0], comparison: 'maior que', value: 0 });
  }, [availableColumns]);

  useEffect(() => {
    const getApi = async () => {
      const apiResults = await fetchApi();
      const filterResults = apiResults.filter((item) => delete item.residents);
      setFixedResults(filterResults);
      setResults(filterResults);
    };
    getApi();
  }, []);

  useEffect(() => {
    const filterByName = results.filter((planet) => planet.name
      .toLowerCase().includes(filterInput.toLowerCase()));
    setFilteredPlanets(activeFilters.reduce((acc, filter) => acc.filter((planet) => {
      switch (filter.comparison) {
      case 'menor que':
        return +planet[filter.column] < +filter.value;
      case 'maior que':
        return +planet[filter.column] > +filter.value;
      default:
        return +planet[filter.column] === +filter.value;
      }
    }), filterByName));
  }, [results, filterInput, activeFilters]);

  const value = {
    fixedResults,
    results,
    setResults,
    filterInput,
    setFilterInput,
    filteredPlanets,
    setFilteredPlanets,
    filters,
    setFilters,
    activeFilters,
    setActiveFilters,
    availableColumns,
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
