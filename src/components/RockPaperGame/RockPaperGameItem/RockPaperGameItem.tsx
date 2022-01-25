import { FC } from 'react';

import { RockPaperGameItemName, IRockPaperGameItem } from '../../../types';

import rockIconPath from '../../../images/rock-paper/icon-rock.svg';
import paperIconPath from '../../../images/rock-paper/icon-paper.svg';
import scissorsIconPath from '../../../images/rock-paper/icon-scissors.svg';
import lizardIconPath from '../../../images/rock-paper/icon-lizard.svg';
import spockIconPath from '../../../images/rock-paper/icon-spock.svg';

import styles from './RockPaperGameItem.module.css';

const rockPaperGameItems: IRockPaperGameItem[] = [
  {
    name: 'rock',
    beats: [
      'scissors',
      'lizard',
    ],
    icon: rockIconPath,
  },
  {
    name: 'paper',
    beats: [
      'rock',
      'spock',
    ],
    icon: paperIconPath,
  },
  {
    name: 'scissors',
    beats: [
      'paper',
      'lizard',
    ],
    icon: scissorsIconPath,
  },
  {
    name: 'lizard',
    beats: [
      'paper',
      'spock',
    ],
    icon: lizardIconPath,
  },
  {
    name: 'spock',
    beats: [
      'rock',
      'scissors',
    ],
    icon: spockIconPath,
  },
];

const getGameItemIconPath = (itemName: RockPaperGameItemName, iconsList: IRockPaperGameItem[]): string => {
  return iconsList.find(item => item.name === itemName)!.icon!;
};

interface RockPaperGameItemProps {
  itemName: RockPaperGameItemName,
  isBigSize?: boolean,
  isOutlined?: boolean,
  isInvisible?: boolean,
  onClickHandler: (itemName: RockPaperGameItemName) => void,
}

const RockPaperGameItem: FC<RockPaperGameItemProps> = ({
  itemName,
  isBigSize = false,
  isOutlined = false,
  isInvisible = false,
  onClickHandler,
}) => {
  const gameItemIconPath = getGameItemIconPath(itemName, rockPaperGameItems);
  return (
    <>
      <div
        className={styles.rockPaperGameItemWrapper}
        tabIndex={1}
        onClick={() => onClickHandler(itemName)}
        data-item-name={itemName}
        data-is-big={isBigSize}
      >
        <img
          className={styles.rockPaperGameItemIcon}
          src={gameItemIconPath}
          alt={`${itemName} icon`} />
      </div>
    </>
  );
};

export default RockPaperGameItem;
