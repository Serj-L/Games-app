import { FC, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { RoutesEnum, LocalStorageKeys } from '../../types/';

import styles from './RockPaperGamePage.module.css';

// eslint-disable-next-line no-unused-vars
export enum RockPaperGameTypes {NORMAL = 'normal', EXTENDED = 'extended'}

type RockPaperGameItemName = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

interface IRockPaperGameItem {
  name: RockPaperGameItemName,
  beats: RockPaperGameItemName[],
}

const RockPaperGameItems: IRockPaperGameItem[] = [
  {
    name: 'rock',
    beats: [
      'scissors',
      'lizard',
    ],
  },
  {
    name: 'paper',
    beats: [
      'rock',
      'spock',
    ],
  },
  {
    name: 'scissors',
    beats: [
      'paper',
      'lizard',
    ],
  },
  {
    name: 'spock',
    beats: [
      'rock',
      'scissors',
    ],
  },
  {
    name: 'lizard',
    beats: [
      'paper',
      'spock',
    ],
  },
];

interface RockPaperGamePageProps {}

const RockPaperGamePage: FC<RockPaperGamePageProps> = () => {
  const { gameType } = useParams();
  const [score, setScore] = useState<number>(gameType === RockPaperGameTypes.NORMAL
    ? Number(localStorage.getItem(LocalStorageKeys.ROCK_PAPER_NORMAL_GAME_SCORE))
    : Number(localStorage.getItem(LocalStorageKeys.ROCK_PAPER_EXTENDED_GAME_SCORE)));

  return (
    <>
      <h1>{`Rock Paper ${gameType} Game Page`}</h1>
      <h2>{`Score: ${score}`}</h2>
      <NavLink
        className={styles.backToHomeLink}
        to={RoutesEnum.GAMES_LIST}
      >
        Back to Games list
      </NavLink>
    </>
  );
};

export default RockPaperGamePage;
