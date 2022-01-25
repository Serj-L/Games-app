import { FC } from 'react';

import { RockPaperGameItemName, RockPaperGameTypes } from '../../../types';

import styles from './RockPaperTitleScore.module.css';

interface RockPaperTitleScoreProps {
  gameItems: RockPaperGameItemName[],
  gameScore: number,
  gameType: string,
  onClickHandler: () => void,
}

const RockPaperTitleScore: FC<RockPaperTitleScoreProps> = ({
  gameItems,
  gameScore,
  gameType,
  onClickHandler,
}) => {
  return (
    <div className={styles.titleScoreWrapper}>
      <ul
        className={styles.titleWrapper}
        style={{ fontSize: gameType === RockPaperGameTypes.NORMAL ? 42 : 30 }}
      >
        {gameItems.map(item => {
          return (
            <li
              key={item}
              className={styles.gameTitle}
            >
              {item.toUpperCase()}
            </li>
          );
        })}
      </ul>
      <div
        className={styles.scoreWrapper}
        style={{ cursor: gameScore ? 'pointer' : 'auto' }}
        onClick={onClickHandler}
      >
        <span className={styles.scoreText}>SCORE</span>
        <span className={styles.scoreNumber}>{gameScore}</span>
      </div>
    </div>
  );
};

export default RockPaperTitleScore;
