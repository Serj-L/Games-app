import { FC } from 'react';

import {
  RockPaperGameTypes,
  RockPaperGameItemName,
} from '../../../types/';

import { RockPaperGameItem } from '../../';

import triangleBg from '../../../images/rock-paper/bg-triangle.svg';
import pentagonBg from '../../../images/rock-paper/bg-pentagon.svg';

import styles from './RockPaperGameItemsList.module.css';

interface RockPaperGameItemsListProps {
  gameType: RockPaperGameTypes,
  gameItems: RockPaperGameItemName[];
  onItemClickHandler: (itemName: RockPaperGameItemName) => void,
}

const RockPaperGameItemsList: FC<RockPaperGameItemsListProps> = ({
  gameType,
  gameItems,
  onItemClickHandler,
}) => {

  const onRockPaperGameItemClickHandler = (itemName: RockPaperGameItemName) => {
    onItemClickHandler(itemName);
  };

  return (
    <ul
      className={styles.rockPaperGameItemsList}
      data-is-extended={gameType === RockPaperGameTypes.EXTENDED}
      style={{ backgroundImage: `url(${gameType === RockPaperGameTypes.NORMAL ? triangleBg : pentagonBg })` }}
    >
      {gameItems.map(item => {
        return (
          <li
            key={item}
            className={styles.rockPaperGameListItemWarpper}
            data-item-name={item}
          >
            <RockPaperGameItem
              itemName={item}
              isBigSize={false}
              onClickHandler={onRockPaperGameItemClickHandler}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default RockPaperGameItemsList;
