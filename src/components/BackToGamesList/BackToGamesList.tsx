import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { RoutesEnum } from '../../types';

import styles from './BackToGamesList.module.css';

interface BackToGamesListProps {}

const BackToGamesList: FC<BackToGamesListProps> = () => {
  return (
    <NavLink
      className={styles.backToHomeLink}
      to={RoutesEnum.GAMES_LIST}
    >
    BACK TO GAMES LIST
    </NavLink>
  );
};

export const MemoizedBackToGamesList = memo(BackToGamesList);
