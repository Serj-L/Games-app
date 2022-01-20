import React from 'react';

import { RoutesEnum } from './types/';
import {
  AppRouter,
  IAppRoute,
} from './router/';
import {
  GamesListPage,
  RockPaperGamePage,
} from './pages/';
import { Container } from './components';

import styles from './App.module.css';

const appRoutes: IAppRoute[] = [
  {
    route: RoutesEnum.GAMES_LIST,
    element: <GamesListPage />,
  },
  {
    route: RoutesEnum.ROCK_PAPER_GAME,
    element: <RockPaperGamePage />,
  },
];

function App() {
  return (
    <div className={styles.App}>
      <Container>
        <AppRouter appRoutes={appRoutes}/>
      </Container>
    </div>
  );
}

export default App;
