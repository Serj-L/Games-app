import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  RockPaperGameTypes,
  RockPaperGameItemName,
  IRockPaperGameChoosenItem,
} from '../../types/';

import {
  getRockPaperGameScoreFromLocalStorage,
  setRockPaperGameScoreToLocalStorage,
} from '../../api/LocalStorage';

import {
  BackToGamesList,
  RockPaperTitleScore,
  Modal,
  Button,
  RockPaperGameItem,
  RockPaperGameResult,
} from '../../components/';

import rulesNormalGame from '../../images/rock-paper/image-rules.svg';
import rulesExtendedGame from '../../images/rock-paper/image-rules-bonus.svg';
import triangleBg from '../../images/rock-paper/bg-triangle.svg';
import pentagonBg from '../../images/rock-paper/bg-pentagon.svg';

import styles from './RockPaperGamePage.module.css';

interface RockPaperGamePageProps {}

const randomInteger = (minInt: number, maxInt: number): number => {
  return Math.floor(minInt + Math.random() * (maxInt + 1 - minInt));
};
const choosenItemsInitialValues: IRockPaperGameChoosenItem = {
  player: 'rock',
  ai:'rock',
};

const RockPaperGamePage: FC<RockPaperGamePageProps> = () => {
  const { gameType = RockPaperGameTypes.NORMAL } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [scrollY, setScrollY] = useState<number>(0);
  const [score, setScore] = useState<number>(getRockPaperGameScoreFromLocalStorage(gameType));
  const gameItems: RockPaperGameItemName[] = gameType === RockPaperGameTypes.NORMAL
    ? ['rock', 'paper', 'scissors']
    : ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  const [isShowResult, setIsShowResult] = useState<boolean>(false);
  const [choosenItems, setChoosenItems] = useState<IRockPaperGameChoosenItem>(choosenItemsInitialValues);

  const onScoreClickHandler = () => {
    if (!score) {
      return;
    }
    setModalTitle('Confirmation');
    setIsModalOpen(true);
    setScrollY(window.scrollY);
  };

  const onConfirmResetHandler = () => {
    setScore(0);
    setRockPaperGameScoreToLocalStorage(gameType, 0);
    setIsModalOpen(false);
  };

  const onPlayerChoiceHandler = (playerChoice: RockPaperGameItemName) => {
    const aiChoice = gameItems[randomInteger(0, gameItems.length - 1)];

    setChoosenItems({
      player: playerChoice,
      ai: aiChoice,
    });

    setIsShowResult(true);
  };

  const changeScoreHandler = useCallback((result: number) => {
    setScore(prevScore => prevScore + result);
  }, []);

  const onPlayAgainButtonHandler = useCallback(() => {
    setIsShowResult(false);
  }, []);

  const onRulesButtonClickHandler = () => {
    setModalTitle('RULES');
    setIsModalOpen(true);
    setScrollY(window.scrollY);
  };

  // scroll page to top when user switches between game items list and game result
  useEffect(() => {
    if (!window.scrollY) {
      return;
    }
    window.scrollTo({
      top: 0,
    });
  }, [isShowResult]);

  // set game score in local storage
  useEffect(() => {
    if (score === getRockPaperGameScoreFromLocalStorage(gameType)) {
      return;
    }
    setRockPaperGameScoreToLocalStorage(gameType, score);
  }, [gameType, score]);

  return (
    <div className={styles.rockPaperGamePageWrapper}>
      <header>
        <RockPaperTitleScore
          gameItems={gameItems}
          gameScore={score}
          gameType={gameType}
          onClickHandler={onScoreClickHandler}
        />
      </header>
      <main className={styles.rockPaperGameContentWarpper}>
        { isShowResult
          ? <RockPaperGameResult
            choosenItems={choosenItems}
            onPlayAgainButtonHandler={onPlayAgainButtonHandler}
            changeScore={changeScoreHandler}
          />
          : <ul
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
                    onClickHandler={(itemName) => onPlayerChoiceHandler(itemName)}
                  />
                </li>
              );
            })}
          </ul>
        }
      </main>
      <footer className={styles.rockPaperGamePageControls}>
        <BackToGamesList />
        <Button
          title='RULES'
          fontSize={16}
          onClickHandler={onRulesButtonClickHandler}
        />
      </footer>

      <Modal
        isOpen={isModalOpen}
        modalTitle={modalTitle}
        windowScrollTopOffset={scrollY}
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
                  isDark={true}
                  isShadow={true}
                  onClickHandler={onConfirmResetHandler}
                />
                <Button
                  title='NO'
                  fontSize={18}
                  isTransparent={false}
                  isDark={true}
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
