import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App main title', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
  const mainTitle = screen.getByText(/Choose game to play/i);
  expect(mainTitle).toBeInTheDocument();
});
