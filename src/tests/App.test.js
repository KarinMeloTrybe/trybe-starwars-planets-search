import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';

describe( 'Testar tabela', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testData),
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
test('Verifica se', () => {
  render(<App />);
});
});
