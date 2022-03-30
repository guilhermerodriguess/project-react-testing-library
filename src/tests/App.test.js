import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente <App.js />', () => {
  test('O primeiro link deve possuir o texto "Home"', () => {
    renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: 'Home' });

    expect(firstLink).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto "About"', () => {
    renderWithRouter(<App />);
    const secondLink = screen.getByRole('link', { name: 'About' });

    expect(secondLink).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const thirdLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(thirdLink).toBeInTheDocument();
  });

  test('Redireciona para a página inicial, na URL / ao clicar no link "Home".', () => {
    const { history } = renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: 'Home' });

    userEvent.click(firstLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Redireciona para a página de /about, ao clicar no link "About".', () => {
    const { history } = renderWithRouter(<App />);
    const secondLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(secondLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Redireciona para /favorites, ao clicar no link "Favorite Pokémons".', () => {
    const { history } = renderWithRouter(<App />);
    const thirdLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(thirdLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Redireciona para a página "Not Found" ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/notFound');
    const notFound = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });

    expect(notFound).toBeInTheDocument();
  });
});
