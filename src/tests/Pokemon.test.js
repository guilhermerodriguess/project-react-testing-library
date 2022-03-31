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

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    // O nome correto do Pokémon deve ser mostrado na tela;
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    // O tipo correto do pokémon deve ser mostrado na tela.
    expect(pokemonType).toHaveTextContent(/electric/i);

    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(details);

    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(checkbox);

    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);

    const iconFav = screen.getByAltText(/Pikachu is marked as favorite/i);

    expect(iconFav).toBeInTheDocument();
    expect(iconFav.src).toBe('http://localhost/star-icon.svg');
  });
});
