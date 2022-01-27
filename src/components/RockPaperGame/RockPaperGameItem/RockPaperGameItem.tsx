import { FC } from 'react';

import { RockPaperGameItemName } from '../../../types';

import rockIconPath from '../../../images/rock-paper/icon-rock.svg';
import paperIconPath from '../../../images/rock-paper/icon-paper.svg';
import scissorsIconPath from '../../../images/rock-paper/icon-scissors.svg';
import lizardIconPath from '../../../images/rock-paper/icon-lizard.svg';
import spockIconPath from '../../../images/rock-paper/icon-spock.svg';

import styles from './RockPaperGameItem.module.css';

const itemsIconPath = {
  rock: rockIconPath,
  paper: paperIconPath,
  scissors: scissorsIconPath,
  lizard: lizardIconPath,
  spock: spockIconPath,
};

interface RockPaperGameItemProps {
  itemName: RockPaperGameItemName,
  isBigSize?: boolean,
  isOutlined?: boolean,
  isVisible?: boolean,
  onClickHandler?: (itemName: RockPaperGameItemName) => void,
}

const RockPaperGameItem: FC<RockPaperGameItemProps> = ({
  itemName,
  isBigSize = false,
  isOutlined = false,
  isVisible = true,
  onClickHandler,
}) => {
  return (
    <>
      <div
        className={styles.rockPaperGameItemWrapper}
        tabIndex={1}
        data-item-name={itemName}
        data-is-big={isBigSize}
        data-is-outlined={isOutlined}
        data-is-visible={isVisible}
        onClick={onClickHandler ? () => onClickHandler(itemName) : undefined}
        onKeyDown={onClickHandler
          ? (e) => {
            if (e.key === 'Enter') {
              onClickHandler(itemName);
            }
          }
          : undefined}
      >
        <img
          className={styles.rockPaperGameItemIcon}
          src={itemsIconPath[itemName]}
          alt={`${itemName} icon`} />
      </div>
    </>
  );
};

export default RockPaperGameItem;
