import {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';

import {
  RockPaperGameTypes,
  RockPaperGameItemName,
} from '../../types/';

import {
  getRockPaperGameScoreFromLocalStorage,
  setRockPaperGameScoreToLocalStorage,
} from '../../api/LocalStorage';

import {
  RockPaperGameTitleScore,
  RockPaperGameAction,
  RockPaperGameControls,
} from '../../components/';

import styles from './RockPaperGamePage.module.css';

interface RockPaperGamePageProps {}

const RockPaperGamePage: FC<RockPaperGamePageProps> = () => {
  const { gameType = RockPaperGameTypes.NORMAL } = useParams<{ gameType: RockPaperGameTypes }>();
  const [score, setScore] = useState<number>(getRockPaperGameScoreFromLocalStorage(gameType));
  const gameItems: RockPaperGameItemName[] = useMemo(() => {
    return gameType === RockPaperGameTypes.NORMAL
      ? ['rock', 'paper', 'scissors']
      : ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  } , [gameType]);

  const changeScoreHandler = useCallback((result: number) => {
    if (result) {
      setScore(prevScore => prevScore + result);
    } else {
      setScore(result);
    }
  }, []);

  // set game score in local storage
  useEffect(() => {
    if (score === getRockPaperGameScoreFromLocalStorage(gameType)) {
      return;
    }
    setRockPaperGameScoreToLocalStorage(gameType, score);
  }, [score, gameType]);

  return (
    <div className={styles.rockPaperGamePageWrapper}>
      <header className={styles.rockPaperGameHeader}>
        <RockPaperGameTitleScore
          gameType={gameType}
          gameItems={gameItems}
          gameScore={score}
          resetScore={changeScoreHandler}
        />
      </header>
      <main className={styles.rockPaperGameContentWarpper}>
        <RockPaperGameAction
          gameType={gameType}
          gameItems={gameItems}
          changeScore={changeScoreHandler}
        />
      </main>
      <footer>
        <RockPaperGameControls gameType={gameType} />
      </footer>
    </div>
  );
};

export default RockPaperGamePage;
