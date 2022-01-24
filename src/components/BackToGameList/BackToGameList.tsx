import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { RoutesEnum } from '../../types/';

import styles from './BackToGameList.module.css';

interface BackToGameListProps {}

const BackToGameList: FC<BackToGameListProps> = () => {
  return (
    <NavLink
      className={styles.backToHomeLink}
      to={RoutesEnum.GAMES_LIST}
    >
    BACK TO GAMES LIST
    </NavLink>
  );
};

export default BackToGameList;
