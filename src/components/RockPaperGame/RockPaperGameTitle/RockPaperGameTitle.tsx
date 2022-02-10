import { FC, memo } from 'react';

import {
  RockPaperGameTypes,
  RockPaperGameItemName,
} from '../../../types';

import styles from './RockPaperGameTitle.module.css';

interface RockPaperGameTitleProps {
  gameType: RockPaperGameTypes,
  gameItems: RockPaperGameItemName[];
}

const RockPaperGameTitle: FC<RockPaperGameTitleProps> = ({
  gameType,
  gameItems,
}) => {

  return (
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
  );
};

const MemoizedRockPaperGameTitle = memo(RockPaperGameTitle);

export default MemoizedRockPaperGameTitle;
