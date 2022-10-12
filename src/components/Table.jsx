import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    filteredPlanets,
    filterInput,
    setFilterInput,
    filters,
    setFilters,
    activeFilters,
    availableColumns,
    setActiveFilters } = useContext(StarWarsContext);

  const columnsTable = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  const handleList = ({ target }) => {
    setFilterInput(target.value);
  };

  const handleFilters = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  };

  const handleClick = () => {
    setActiveFilters([...activeFilters, filters]);
  };

  const handleDelete = ({ target }) => {
    setActiveFilters(activeFilters.filter((filter) => filter.column !== target.name));
  };

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Pesquisar"
        value={ filterInput }
        onChange={ (event) => handleList(event) }
      />
      <select
        data-testid="column-filter"
        name="column"
        value={ filters.column }
        onChange={ (event) => handleFilters(event) }
      >
        {availableColumns.map((column) => (
          <option key={ column } value={ column }>{column}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ filters.comparison }
        onChange={ (event) => handleFilters(event) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        data-testid="value-filter"
        type="text"
        placeholder="Valor"
        value={ filters.value }
        onChange={ (event) => handleFilters(event) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => setActiveFilters([]) }
      >
        Limpar Filtros

      </button>
      <div>
        {activeFilters.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <p>{`${filter.column}: ${filter.value}`}</p>
            <button
              name={ filter.column }
              type="button"
              onClick={ (event) => handleDelete(event) }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            {columnsTable.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          { filteredPlanets
            .map((result, index) => (
              <tr key={ index }>
                {Object.entries(result).map(([key, value]) => (
                  <td
                    key={ key }
                    data-testid={ columnsTable === key ? 'planet-name' : key }
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
