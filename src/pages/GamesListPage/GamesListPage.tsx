import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../../types/';
import { GameCard } from '../../components/';

import styles from './GamesListPage.module.css';

import rockPaperPreview from '../../images/rock-paper/gamePreview.jpg';

interface GamesListPageProps {}

const GamesListPage: FC<GamesListPageProps> = () => {
  const navigate = useNavigate();

  const onGameCardClickHandler = (path: RoutesEnum) => navigate(path);

  return (
    <>
      <h1 className={styles.gamesListTitle}>Choose game to play</h1>
      <div className={styles.gamesListWrapper}>
        <GameCard
          gamePreviewSrc={rockPaperPreview}
          gameTitle='Rock, Paper, Scissors'
          gameDescription='Rock, paper, scissors (also known by other orderings of the three items, with "rock" sometimes being called "stone", or as Rochambeau, roshambo, or ro-sham-bo) is a hand game, usually played between two people, in which each player simultaneously forms one of three shapes with an outstretched hand.'
          onClickHandler={() => onGameCardClickHandler(RoutesEnum.ROCK_PAPER_GAME)}
        />
      </div>
    </>
  );
};

export default GamesListPage;
