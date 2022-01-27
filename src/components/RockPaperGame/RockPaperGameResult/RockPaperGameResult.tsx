import { FC, useState, useEffect } from 'react';

import {
  IRockPaperGameItem,
  IRockPaperGameChoosenItem,
  RockPaperGameItemName,
} from '../../../types';

import {
  RockPaperGameItem,
  Button,
} from '../../';

import styles from './RockPaperGameResult.module.css';

interface RockPaperGameResultProps {
  choosenItems: IRockPaperGameChoosenItem,
  onPlayAgainButtonHandler: () => void,
  changeScore: (result: number) => void,
}

const rockPaperGameItems: IRockPaperGameItem[] = [
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
    name: 'lizard',
    beats: [
      'paper',
      'spock',
    ],
  },
  {
    name: 'spock',
    beats: [
      'rock',
      'scissors',
    ],
  },
];

const RockPaperGameResult: FC<RockPaperGameResultProps> = ({
  choosenItems,
  onPlayAgainButtonHandler,
  changeScore,
}) => {
  const [winItem, setWinItem] = useState<RockPaperGameItemName | null>(null);
  const [isShowAiChoosenItem, setIsShowAiChoosenItem] = useState<boolean>(false);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShowAiChoosenItem(true);

      setTimeout(() => {
        setIsShowResult(true);
      }, 1000);

    }, 1000);

    if (choosenItems.player !== choosenItems.ai) {
      const winner = rockPaperGameItems.find(item => item.name === choosenItems.player)?.beats.includes(choosenItems.ai) ? choosenItems.player : choosenItems.ai;

      setWinItem(winner);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isShowResult || !winItem) {
      return;
    }

    changeScore(winItem === choosenItems.player ? 1 : -1);

  }, [isShowResult, winItem, choosenItems.player, changeScore]);

  return (
    <div className={styles.rockPaperGameResultWrapper}>
      <div className={styles.choosenItemCard}>
        <span className={styles.choosenItemCardTitle}>YOU PICKED</span>
        <RockPaperGameItem
          itemName={choosenItems.player}
          isBigSize={true}
          isOutlined={(winItem && isShowResult) ? winItem === choosenItems.player : false}
        />
      </div>
      <div
        className={styles.resultControls}
        data-is-visible={isShowResult}
      >
        <span className={styles.resultText}>{winItem ? `YOU ${winItem === choosenItems.player ? 'WIN' : 'LOSE'} ` : 'DRAW'}</span>
        <Button
          title='PLAY AGAIN'
          fontSize={18}
          isTransparent={false}
          onClickHandler={onPlayAgainButtonHandler}
        />
      </div>
      <div className={styles.choosenItemCard}>
        <span className={styles.choosenItemCardTitle}>THE HOUSE PICKED</span>
        <RockPaperGameItem
          itemName={choosenItems.ai}
          isBigSize={true}
          isOutlined={(winItem && isShowResult) ? winItem === choosenItems.ai : false}
          isVisible={isShowAiChoosenItem}
        />
      </div>
    </div>
  );
};

export default RockPaperGameResult;
