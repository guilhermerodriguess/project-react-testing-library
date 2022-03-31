import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { NotFound } from '../components';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const textTitle = screen.getByRole('heading',
      { name: /Page requested not found Crying emoji/i });
    expect(textTitle).toBeInTheDocument();
  });

  test('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getAllByRole('img');
    expect(img[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
