import { FC } from 'react';

import imgBlank from '../../images/file-image-regular.svg';

import styles from './GameCard.module.css';

interface GameCardProps {
  gamePreviewSrc: string,
  gameTitle: string,
  gameDescription?: string,
  onClickHandler: () => void,
}

const GameCard: FC<GameCardProps> = ({
  gamePreviewSrc,
  gameTitle,
  gameDescription = '',
  onClickHandler,
}) => {
  return (
    <div
      className={styles.cardContainer}
      tabIndex={0}
      onClick={onClickHandler}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClickHandler();
        }
      }}
    >
      <div
        className={styles.gamePreviewWrapper}
        style={{ background: `current url(${imgBlank}) center / 20% no-repeat` }}
      >
        <img
          className={styles.gamePreviewImg}
          src={gamePreviewSrc}
          alt={`The ${gameTitle} preview`}
          loading='lazy'
        />
      </div>
      <div className={styles.contentWrapper}>
        <h2 className={styles.gameTitle}>{gameTitle}</h2>
        <p className={styles.gameDescription}>{gameDescription}</p>
      </div>
    </div>
  );
};

export default GameCard;
