import { FC } from 'react';

import {
  RockPaperGameTypes,
  RockPaperGameItemName,
} from '../../../types/';

import {
  Modal,
  Button,
  MemoizedRockPaperGameTitle,
} from '../..';

import { useModal } from '../../../hooks/useModal';

import styles from './RockPaperGameTitleScore.module.css';

interface RockPaperGameTitleScoreProps {
  gameType: RockPaperGameTypes,
  gameItems: RockPaperGameItemName[];
  gameScore: number,
  resetScore: (result: 0) => void,
}

const RockPaperGameTitleScore: FC<RockPaperGameTitleScoreProps> = ({
  gameType,
  gameItems,
  gameScore,
  resetScore,
}) => {
  const {
    modalParams,
    modalOpenHandler,
    modalCloseHandler,
  } = useModal();

  const onScoreClickHandler = () => {
    if (!gameScore) {
      return;
    }
    modalOpenHandler();
  };

  const onConfirmResetScoreHandler = () => {
    resetScore(0);
    modalCloseHandler();
  };

  return (
    <>
      <div className={styles.titleScoreWrapper}>
        <MemoizedRockPaperGameTitle
          gameType={gameType}
          gameItems={gameItems}
        />
        <div
          className={styles.scoreWrapper}
          style={{ cursor: gameScore ? 'pointer' : 'auto' }}
          onClick={onScoreClickHandler}
        >
          <span className={styles.scoreText}>SCORE</span>
          <span className={styles.scoreNumber}>{gameScore}</span>
        </div>
      </div>

      <Modal
        isOpen={modalParams.isOpen}
        modalTitle='Confirmation'
        windowScrollTopOffset={modalParams.scrollY}
        closeModalHandler={modalCloseHandler}
      >
        <div className={styles.resetScoreModalContent}>
          <p className={styles.resetScoreText}>Do you really want to reset your scores?</p>
          <div className={styles.resetScoreButtons}>
            <Button
              title='YES'
              fontSize={18}
              isTransparent={false}
              isDark={true}
              isShadow={true}
              onClickHandler={onConfirmResetScoreHandler}
            />
            <Button
              title='NO'
              fontSize={18}
              isTransparent={false}
              isDark={true}
              isShadow={true}
              onClickHandler={modalCloseHandler}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RockPaperGameTitleScore;
