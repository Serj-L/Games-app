import {
  FC,
  useState,
  useEffect,
  useCallback,
  memo,
} from 'react';

import {
  RockPaperGameTypes,
  RockPaperGameItemName,
  IRockPaperGameChoosenItem,
} from '../../../types/';

import {
  RockPaperGameItemsList,
  RockPaperGameResult,
} from '../../';

import styles from './RockPaperGameAction.module.css';

interface RockPaperGameActionProps {
  gameType: RockPaperGameTypes,
  gameItems: RockPaperGameItemName[];
  changeScore: (result: number) => void;
}

const randomInteger = (minInt: number, maxInt: number): number => {
  return Math.floor(minInt + Math.random() * (maxInt + 1 - minInt));
};
const choosenItemsInitialValues: IRockPaperGameChoosenItem = {
  player: 'rock',
  ai:'rock',
};

const RockPaperGameAction: FC<RockPaperGameActionProps> = ({
  gameType,
  gameItems,
  changeScore,
}) => {
  const [choosenItems, setChoosenItems] = useState<IRockPaperGameChoosenItem>(choosenItemsInitialValues);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);

  const onPlayerChoiceHandler = useCallback((playerChoice: RockPaperGameItemName) => {
    const aiChoice = gameItems[randomInteger(0, gameItems.length - 1)];

    setChoosenItems({
      player: playerChoice,
      ai: aiChoice,
    });

    setIsShowResult(true);
  }, [gameItems]);

  const onPlayAgainButtonHandler = useCallback(() => {
    setIsShowResult(false);
  }, []);

  // scroll page to top when user switches between game items list and game result
  useEffect(() => {
    if (!window.scrollY) {
      return;
    }
    window.scrollTo({
      top: 0,
    });
  }, [isShowResult]);

  return (
    <div className={styles.rockPaperGameActionWarpper}>
      {
        isShowResult
          ? <RockPaperGameResult
            choosenItems={choosenItems}
            onPlayAgainButtonHandler={onPlayAgainButtonHandler}
            changeScore={changeScore}
          />
          : <RockPaperGameItemsList
            gameType={gameType}
            gameItems={gameItems}
            onItemClickHandler={onPlayerChoiceHandler}
          />
      }
    </div>
  );
};

export const MemoizedRockPaperGameAction = memo(RockPaperGameAction);
