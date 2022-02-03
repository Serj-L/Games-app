import { FC, useState, useEffect, useRef } from 'react';

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
const getWinItem = (choosenItems: IRockPaperGameChoosenItem, rockPaperGameItems: IRockPaperGameItem[]): RockPaperGameItemName | null => {
  if (choosenItems.player === choosenItems.ai) {
    return null;
  } else {
    const winItem = rockPaperGameItems.find(item => item.name === choosenItems.player)?.beats.includes(choosenItems.ai) ? choosenItems.player : choosenItems.ai;

    return winItem;
  }
};
const gameItemChangeSizeBreakPoint = 910;

const RockPaperGameResult: FC<RockPaperGameResultProps> = ({
  choosenItems,
  onPlayAgainButtonHandler,
  changeScore,
}) => {
  const [winItem] = useState<RockPaperGameItemName | null>(getWinItem(choosenItems, rockPaperGameItems));
  const [isShowAiChoosenItem, setIsShowAiChoosenItem] = useState<boolean>(false);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);
  const [isItemBigSize, setIsItemBigSize] = useState<boolean>(window.innerWidth > gameItemChangeSizeBreakPoint);
  const [choosenItemTranslateXVariable, setChoosenItemTranslateXVariable] = useState<number>(100);
  const gameResultWrapperElement = useRef<HTMLDivElement>(null);
  const gameResultControlsElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsShowAiChoosenItem(true);

      setTimeout(() => {
        setIsShowResult(true);
      }, 1000);

    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isShowResult || !winItem) {
      return;
    }

    changeScore(winItem === choosenItems.player ? 1 : -1);

  }, [isShowResult, winItem, choosenItems.player, changeScore]);

  // set value using in CSS variable '--translate-x-value' (needed for animate choosenItemCard elements horizontal movement)
  useEffect(() => {
    if (!gameResultWrapperElement.current || !gameResultControlsElement.current) {
      return;
    }
    const { current: wrapper } = gameResultWrapperElement;
    const { current: element } = gameResultControlsElement;
    const elementWidth = element.offsetWidth;
    const elementHorizontalGap = parseInt(window.getComputedStyle(wrapper).getPropertyValue('column-gap'));
    const translateXValue = elementWidth / 2 + elementHorizontalGap;

    setChoosenItemTranslateXVariable(translateXValue);
  }, []);

  useEffect(() => {
    const windowResizeHandler = () => {
      setIsItemBigSize(window.innerWidth > gameItemChangeSizeBreakPoint);
    };

    window.addEventListener('resize', windowResizeHandler);

    return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);

  return (
    <div
      className={styles.rockPaperGameResultWrapper}
      data-is-ai-choice-visible={isShowAiChoosenItem}
      data-is-result-visible={isShowResult}
      ref={gameResultWrapperElement}
    >
      <div
        className={styles.choosenItemCard}
        style={{ ['--translate-x-value' as string] : `calc(${choosenItemTranslateXVariable}px - 15%)` }}
        data-is-player={true}
        data-is-outlined={winItem === choosenItems.player}
      >
        <span className={styles.choosenItemCardTitle}>YOU PICKED</span>
        <RockPaperGameItem
          itemName={choosenItems.player}
          isBigSize={isItemBigSize}
          isOutlined={(winItem && isShowResult) ? winItem === choosenItems.player : false}
          isCursorPointer={false}
        />
      </div>
      <div
        className={styles.resultControls}
        ref={gameResultControlsElement}
      >
        <span className={styles.resultText}>{winItem ? `YOU ${winItem === choosenItems.player ? 'WIN' : 'LOSE'} ` : 'IT\'S A DRAW'}</span>
        <Button
          title='PLAY AGAIN'
          fontSize={18}
          isTransparent={false}
          onClickHandler={onPlayAgainButtonHandler}
        />
      </div>
      <div
        className={styles.choosenItemCard}
        data-is-ai={true}
        data-is-outlined={winItem === choosenItems.ai}
        style={{ ['--translate-x-value' as string] : `calc((${choosenItemTranslateXVariable}px - 15%) * -1)` }}
      >
        <span className={styles.choosenItemCardTitle}>THE HOUSE PICKED</span>
        <RockPaperGameItem
          itemName={choosenItems.ai}
          isBigSize={isItemBigSize}
          isOutlined={(winItem && isShowResult) ? winItem === choosenItems.ai : false}
          isVisible={isShowAiChoosenItem}
          isCursorPointer={false}
        />
      </div>
    </div>
  );
};

export default RockPaperGameResult;
