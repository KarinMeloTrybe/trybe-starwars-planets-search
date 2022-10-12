import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe( 'Testar tabela', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  })
test('Verifica se a tabela contém 13 colunas', () => {
  render(<App />);
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
test('Verifica se ao pesquisar um planeta o filtro retorna apenas o resultado esperado', async() => {
  render(<App />);
  const planets = await screen.findAllByTestId('planet-name');
  expect(planets).toHaveLength(10);
  const nameInput = screen.getByTestId('name-filter')
  expect(nameInput).toBeInTheDocument();
  userEvent.click(nameInput);
  userEvent.type(nameInput, 'Alderaan');
  expect(await screen.findAllByTestId('planet-name')).toHaveLength(1);
});
test('Verifica se ao filtrar retorna apenas o resultado esperado', async() => {
  render(<App />);
  const columnSelect = screen.getByTestId('column-filter');
  expect(columnSelect).toBeInTheDocument();
  userEvent.click(columnSelect);
  userEvent
});
});
