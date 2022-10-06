import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { results } = useContext(StarWarsContext);

  const columnsTable = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  return (
    <table>
      <thead>
        <tr>
          {columnsTable.map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        { results.map((result, index) => (
          <tr key={ index }>
            {Object.entries(result).map(([key, value]) => (
              <td key={ key } data-testid={ columnsTable === key ? 'planet-name' : key }>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
