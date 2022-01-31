import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesEnum, RockPaperGameTypes } from '../../types/';
import { GameCard } from '../../components/';

import styles from './GamesListPage.module.css';

import rockPaperNormalPreview from '../../images/rock-paper/normalGamePreview.jpg';
import rockPaperExtendedPreview from '../../images/rock-paper/extendedGamePreview.jpg';

interface GamesListPageProps {}

const GamesListPage: FC<GamesListPageProps> = () => {
  const navigate = useNavigate();

  const onGameCardClickHandler = (path: string) => navigate(path);

  useEffect(() => {
    if (!window.scrollY) {
      return;
    }
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <h1 className={styles.gamesListTitle}>Choose game to play</h1>
      <div className={styles.gamesListWrapper}>
        <GameCard
          gamePreviewSrc={rockPaperNormalPreview}
          gameTitle='Rock, Paper, Scissors'
          gameDescription='Rock, paper, scissors (also known by other orderings of the three items, with "rock" sometimes being called "stone", or as Rochambeau, roshambo, or ro-sham-bo) is a hand game, usually played between two people, in which each player simultaneously forms one of three shapes with an outstretched hand.'
          onClickHandler={() => onGameCardClickHandler(RoutesEnum.ROCK_PAPER_GAME_ENDPOINT + RockPaperGameTypes.NORMAL)}
        />
        <GameCard
          gamePreviewSrc={rockPaperExtendedPreview}
          gameTitle='Rock, Paper, Scissors, Lizard, Spock'
          gameDescription='Extended version of Rock, paper, scissors game, usually played between two people, in which each player simultaneously forms one of five shapes with an outstretched hand.'
          onClickHandler={() => onGameCardClickHandler(RoutesEnum.ROCK_PAPER_GAME_ENDPOINT + RockPaperGameTypes.EXTENDED)}
        />
      </div>
    </>
  );
};

export default GamesListPage;
