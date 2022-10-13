import React from 'react';
import {
  render,
  screen,
  within,
  waitFor
} from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';


describe('Testar tabela', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  })
  test('Verifica se a tabela contém 13 colunas', () => {
    render( < App /> );
    const column1 = screen.getByText('Name');
    const column2 = screen.getByText('Rotation Period');
    const column3 = screen.getByText('Orbital Period');
    const column4 = screen.getByText('Diameter');
    const column5 = screen.getByText('Climate');
    const column6 = screen.getByText('Gravity');
    const column7 = screen.getByText('Terrain');
    const column8 = screen.getByText('Surface Water');
    const column9 = screen.getByText('Population');
    const column10 = screen.getByText('Films');
    const column11 = screen.getByText('Created');
    const column12 = screen.getByText('Edited');
    const column13 = screen.getByText('URL');
    expect(column1).toBeInTheDocument();
    expect(column2).toBeInTheDocument();
    expect(column3).toBeInTheDocument();
    expect(column4).toBeInTheDocument();
    expect(column5).toBeInTheDocument();
    expect(column6).toBeInTheDocument();
    expect(column7).toBeInTheDocument();
    expect(column8).toBeInTheDocument();
    expect(column9).toBeInTheDocument();
    expect(column10).toBeInTheDocument();
    expect(column11).toBeInTheDocument();
    expect(column12).toBeInTheDocument();
    expect(column13).toBeInTheDocument();
  });
  test('Verifica se ao pesquisar um planeta o filtro retorna apenas o resultado esperado', async () => {
    render( < App /> );
    const planets = await screen.findAllByTestId('planet-name');
    expect(planets).toHaveLength(10);
    const nameInput = screen.getByTestId('name-filter')
    expect(nameInput).toBeInTheDocument();
    userEvent.click(nameInput);
    userEvent.type(nameInput, 'Alderaan');
    expect(await screen.findAllByTestId('planet-name')).toHaveLength(1);
  });
  test('Verifica se ao filtrar retorna apenas o resultado esperado e verifica o funcionamento do botão Limpar filtros', async () => {
    render( < App /> );
    const columnSelect = screen.getByTestId('column-filter');
    expect(columnSelect).toBeInTheDocument();
    userEvent.selectOptions(columnSelect, within(columnSelect).getByRole('option', {
      name: 'diameter'
    }))
    const comparisonSelect = screen.getByTestId('comparison-filter');
    expect(comparisonSelect).toBeInTheDocument();
    userEvent.selectOptions(comparisonSelect, 'menor que');
    const valueInput = screen.getByTestId('value-filter')
    expect(valueInput).toBeInTheDocument();
    userEvent.click(valueInput);
    userEvent.type(valueInput, '10000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    userEvent.click(buttonFilter);
    await waitFor(()=>{
      const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(3);
    })
    const buttonClear = screen.getByTestId('button-remove-filters');
    expect(buttonClear).toBeInTheDocument();
    userEvent.click(buttonClear);
    await waitFor(()=>{
      const planets = screen.getAllByTestId('planet-name');
      expect(planets).toHaveLength(10);
    })
    
  });

   test('Verifica se o botão para Limpar o filtro individualmente funciona corretamente', async () => {
     render( < App /> );
     const columnSelect = screen.getByTestId('column-filter');
    expect(columnSelect).toBeInTheDocument();
    userEvent.selectOptions(columnSelect, within(columnSelect).getByRole('option', {
      name: 'population'
    }))
     const comparisonSelect = screen.getByTestId('comparison-filter');
     expect(comparisonSelect).toBeInTheDocument();
     userEvent.selectOptions(comparisonSelect, within(comparisonSelect).getByRole('option', {
       name: 'maior que'
     }))
     const valueInput = screen.getByTestId('value-filter')
    expect(valueInput).toBeInTheDocument();
    userEvent.click(valueInput);
    userEvent.type(valueInput, '200000');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    userEvent.click(buttonFilter);
     await waitFor(()=>{
      const filters = screen.getAllByTestId('filter');
    expect(filters).toHaveLength(4);
    })
    const buttonClearOne = screen.getByRole('X');
    expect(buttonClearOne).toBeInTheDocument();
    userEvent.click(buttonClearOne);
    await waitFor(()=>{
      const filters = screen.getAllByTestId('filter');
      expect(filters).toHaveLength(5);
    })
 });
});
