import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const textTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(textTitle).toBeInTheDocument();
  });

  test('É exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    pokemons.forEach((pokemon) => {
      const currencyPokemon = screen.getByText(pokemon.name);
      expect(currencyPokemon).toBeInTheDocument();

      const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextPokemon);

      const image = screen.getAllByRole('img');
      expect(image).toHaveLength(1);
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    pokemons.forEach((pokemon) => {
      const currencyPokemon = screen.getByText(pokemon.name);
      expect(currencyPokemon).toBeInTheDocument();

      const nextPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
      userEvent.click(nextPokemon);
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    pokemons.forEach((pokemon) => {
      const buttonAll = screen.getByRole('button', { name: /All/i });
      expect(buttonAll).toBeInTheDocument();

      const pokemonsTypesLength = 7;

      const typesBttn = screen.getAllByTestId('pokemon-type-button');
      expect(typesBttn).toHaveLength(pokemonsTypesLength);

      const buttonFilter = screen.getByRole('button', { name: pokemon.type });

      userEvent.click(buttonFilter);

      const pokemonsTypeLength = pokemons
        .filter((pokemonTypeFilter) => pokemon.type === pokemonTypeFilter.type).length;

      const nextPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });

      if (pokemonsTypeLength <= 1) {
        expect(nextPokemon).toBeDisabled();
      } else {
        expect(nextPokemon).not.toBeDisabled();
      }
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
  });
});
