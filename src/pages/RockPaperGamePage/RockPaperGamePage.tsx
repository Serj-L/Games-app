import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LocalStorageKeys } from '../../types/';

import {
  BackToGameList,
  RockPaperTitleScore,
  Modal,
  Button,
} from '../../components/';

import rulesNormalGame from '../../images/rock-paper/image-rules.svg';
import rulesExtendedGame from '../../images/rock-paper/image-rules-bonus.svg';

import styles from './RockPaperGamePage.module.css';

// eslint-disable-next-line no-unused-vars
export enum RockPaperGameTypes {NORMAL = 'normal', EXTENDED = 'extended'}

export type RockPaperGameItemName = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

interface IRockPaperGameItem {
  name: RockPaperGameItemName,
  beats: RockPaperGameItemName[],
}

const RockPaperGameItems: IRockPaperGameItem[] = [
  {
    name: 'rock',
    beats: [
      'scissors',
      'lizard',
    ],
  },
  {
    name: 'paper',
    beats: [
      'rock',
      'spock',
    ],
  },
  {
    name: 'scissors',
    beats: [
      'paper',
      'lizard',
    ],
  },
  {
    name: 'spock',
    beats: [
      'rock',
      'scissors',
    ],
  },
  {
    name: 'lizard',
    beats: [
      'paper',
      'spock',
    ],
  },
];

interface RockPaperGamePageProps {}

const RockPaperGamePage: FC<RockPaperGamePageProps> = () => {
  const { gameType = RockPaperGameTypes.NORMAL } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [score, setScore] = useState<number>(gameType === RockPaperGameTypes.NORMAL
    ? Number(localStorage.getItem(LocalStorageKeys.ROCK_PAPER_NORMAL_GAME_SCORE))
    : Number(localStorage.getItem(LocalStorageKeys.ROCK_PAPER_EXTENDED_GAME_SCORE)));
  const gameItems: RockPaperGameItemName[] = gameType === RockPaperGameTypes.NORMAL
    ? ['rock', 'paper', 'scissors']
    : ['rock', 'paper', 'scissors', 'lizard', 'spock'];

  const onScoreClickHandler = () => {
    if (!score) {
      return;
    }
    setModalTitle('Confirmation');
    setIsModalOpen(true);
  };

  const onRulesButtonClickHandler = () => {
    setModalTitle('RULES');
    setIsModalOpen(true);
  };

  const onConfirmResetHandler = () => {
    const localStorageKey = gameType === RockPaperGameTypes.NORMAL
      ? LocalStorageKeys.ROCK_PAPER_NORMAL_GAME_SCORE
      : LocalStorageKeys.ROCK_PAPER_EXTENDED_GAME_SCORE;

    setScore(0);
    localStorage.setItem(localStorageKey, '0');
    setIsModalOpen(false);
  };

  return (
    <div className={styles.RockPaperGamePageWrapper}>
      <RockPaperTitleScore
        gameItems={gameItems}
        gameScore={score}
        gameType={gameType}
        onClickHandler={onScoreClickHandler}
      />
      <h1>{`${gameType} game`}</h1>
      <div className={styles.RockPaperGamePageControls}>
        <BackToGameList />
        <Button
          title='RULES'
          fontSize={16}
          onClickHandler={onRulesButtonClickHandler}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        modalTitle={modalTitle}
        closeModalHandler={() => setIsModalOpen(false)}
      >
        {
          modalTitle === 'RULES'
            ? <img
              className={styles.rulesImg}
              src={gameType === RockPaperGameTypes.NORMAL ? rulesNormalGame : rulesExtendedGame}
              alt="Game rules diagram"
            />
            : <div className={styles.resetScoreModalContent}>
              <p className={styles.resetScoreText}>Do you really want to reset all your scores?</p>
              <div className={styles.resetScoreButtons}>
                <Button
                  title='YES'
                  fontSize={18}
                  isTransparent={false}
                  isShadow={true}
                  onClickHandler={onConfirmResetHandler}
                />
                <Button
                  title='NO'
                  fontSize={18}
                  isTransparent={false}
                  isShadow={true}
                  onClickHandler={() => setIsModalOpen(false)}
                />
              </div>
            </div>
        }
      </Modal>
    </div>
  );
};

export default RockPaperGamePage;
