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

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    renderWithRouter(<App />);

    const pokemonDetail = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(pokemonDetail);

    const pokemonName = screen.getByRole('heading', { name: /Pikachu Details/i });
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    expect(pokemonName).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado
    expect(pokemonDetail).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { name: /Summary/i });
    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    expect(summaryTitle).toBeInTheDocument();

    const resumPokemon = screen.getByText(/This intelligent Pokémon/i);
    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    expect(resumPokemon).toBeInTheDocument();
  });

  test('Existe na página os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const pokemonDetail = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(pokemonDetail);

    const locationsTitle = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i });
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    expect(locationsTitle).toBeInTheDocument();

    const nameLocation1 = screen.getByText('Kanto Power Plant');
    const nameLocation2 = screen.getByText('Kanto Viridian Forest');
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes
    expect(nameLocation1).toBeInTheDocument();
    expect(nameLocation2).toBeInTheDocument();

    const imageLocation = screen.getAllByAltText(/Pikachu Location/i);
    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    expect(imageLocation).toHaveLength(2);

    const imageLocation1 = screen.getAllByAltText(/Pikachu Location/i);
    // A imagem da localização deve ter um atributo src com a URL da localização;
    expect(imageLocation1[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocation1[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const pokemonDetail = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(pokemonDetail);

    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const iconFav = screen.getByAltText(/Pikachu is marked as favorite/i);
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    expect(iconFav).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(iconFav).not.toBeInTheDocument();
  });
});
