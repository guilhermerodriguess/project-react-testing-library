import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { averageWeight, id, image, name, type } = pokemon;
      const { measurementUnit, value } = averageWeight;
      const showNamePokemon = screen.getByText(name);
      // O nome correto do Pokémon deve ser mostrado na tela;
      expect(showNamePokemon).toBeInTheDocument();

      const showTypePokemon = screen.getByTestId('pokemon-type', { name: type });
      // O tipo correto do pokémon deve ser mostrado na tela.
      expect(showTypePokemon).toBeInTheDocument();

      const showWeightPokemon = screen
        .getByText(`Average weight: ${value} ${measurementUnit}`);
      //O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
      expect(showWeightPokemon).toBeInTheDocument();

      const showImagePokemon = screen.getByRole('img', { src: image });
      // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
      expect(showImagePokemon.src).toBe(image);
      expect(showImagePokemon.alt).toBe(`${name} sprite`);

      const details = screen.getByRole('link', { name: /More Details/i });
      expect(details.href).toBe(`http://localhost/pokemons/${id}`);

      const nextPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
      userEvent.click(nextPokemon);
    });
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
