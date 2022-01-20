import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { RoutesEnum } from '../../types/';

import styles from './RockPaperGamePage.module.css';

interface RockPaperGamePageProps {}

const RockPaperGamePage: FC<RockPaperGamePageProps> = () => {
  return (
    <>
      <h1>Rock Paper Game Page</h1>
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
