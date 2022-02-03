import { FC, CSSProperties } from 'react';

import { RockPaperGameItemName } from '../../../types';

import rockIconPath from '../../../images/rock-paper/icon-rock.svg';
import paperIconPath from '../../../images/rock-paper/icon-paper.svg';
import scissorsIconPath from '../../../images/rock-paper/icon-scissors.svg';
import lizardIconPath from '../../../images/rock-paper/icon-lizard.svg';
import spockIconPath from '../../../images/rock-paper/icon-spock.svg';

import styles from './RockPaperGameItem.module.css';

interface RockPaperGameItemProps {
  itemName: RockPaperGameItemName,
  isBigSize?: boolean,
  isOutlined?: boolean,
  isVisible?: boolean,
  isCursorPointer?: boolean,
  onClickHandler?: (itemName: RockPaperGameItemName) => void,
}

const itemsIconPath = {
  rock: rockIconPath,
  paper: paperIconPath,
  scissors: scissorsIconPath,
  lizard: lizardIconPath,
  spock: spockIconPath,
};
const stylesCursorPointer: CSSProperties = {
  cursor: 'pointer',
  pointerEvents: 'auto',
};
const stylesCursorAuto: CSSProperties = {
  cursor: 'auto',
  pointerEvents: 'none',
};

const RockPaperGameItem: FC<RockPaperGameItemProps> = ({
  itemName,
  isBigSize = false,
  isOutlined = false,
  isVisible = true,
  isCursorPointer = true,
  onClickHandler,
}) => {
  return (
    <div
      className={styles.rockPaperGameItemContainer}
      style={ isCursorPointer ? stylesCursorPointer : stylesCursorAuto }
      data-is-outlined={isOutlined}
      data-is-big={isBigSize}
    >
      <div className={styles.thirdOutline}></div>
      <div className={styles.secondOutline}></div>
      <div className={styles.firstOutline}></div>
      <div
        className={styles.rockPaperGameItemWrapper}
        tabIndex={isCursorPointer ? 1 : undefined}
        data-item-name={itemName}
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
    </div>
  );
};

export default RockPaperGameItem;
