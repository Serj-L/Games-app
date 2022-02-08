import { FC, memo } from 'react';

import { RockPaperGameTypes } from '../../../types';

import {
  BackToGamesList,
  Button,
  Modal,
} from '../..';

import { useModal } from '../../../hooks/useModal';

import rulesNormalGame from '../../../images/rock-paper/image-rules.svg';
import rulesExtendedGame from '../../../images/rock-paper/image-rules-bonus.svg';

import styles from './RockPaperGameControls.module.css';

interface RockPaperGameControlsProps { gameType: RockPaperGameTypes }

const RockPaperGameControls: FC<RockPaperGameControlsProps> = ({ gameType }) => {
  const {
    modalParams,
    modalOpenHandler,
    modalCloseHandler,
  } = useModal();

  return (
    <>
      <div className={styles.rockPaperGameControls}>
        <BackToGamesList />
        <Button
          title='RULES'
          fontSize={16}
          onClickHandler={modalOpenHandler}
        />
      </div>

      <Modal
        isOpen={modalParams.isOpen}
        modalTitle='RULES'
        windowScrollTopOffset={modalParams.scrollY}
        closeModalHandler={modalCloseHandler}
      >
        <img
          className={styles.rulesImg}
          src={gameType === RockPaperGameTypes.NORMAL ? rulesNormalGame : rulesExtendedGame}
          alt="Game rules diagram"
        />
      </Modal>
    </>
  );
};

export const MemoizedRockPaperGameControls = memo(RockPaperGameControls);
