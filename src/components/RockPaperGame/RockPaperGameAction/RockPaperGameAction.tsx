import {
  FC,
  useState,
  useEffect,
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

import { randomInteger } from '../../../helpers';

import styles from './RockPaperGameAction.module.css';

interface RockPaperGameActionProps {
  gameType: RockPaperGameTypes,
  gameItems: RockPaperGameItemName[];
  changeScore: (result: number) => void;
}

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

  const onPlayerChoiceHandler = (playerChoice: RockPaperGameItemName) => {
    const aiChoice = gameItems[randomInteger(0, gameItems.length - 1)];

    setChoosenItems({
      player: playerChoice,
      ai: aiChoice,
    });

    setIsShowResult(true);
  };

  const onPlayAgainButtonHandler = () => {
    setIsShowResult(false);
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

const MemoizedRockPaperGameAction = memo(RockPaperGameAction);

export default MemoizedRockPaperGameAction;
