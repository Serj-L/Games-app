import {
  LocalStorageKeys,
  RockPaperGameTypes,
} from '../types';

/* RockPaperGame */
const getLocalStorageKey = (gameType: string): LocalStorageKeys => {
  return gameType === RockPaperGameTypes.NORMAL ? LocalStorageKeys.ROCK_PAPER_NORMAL_GAME_SCORE : LocalStorageKeys.ROCK_PAPER_EXTENDED_GAME_SCORE;
};

export const getRockPaperGameScoreFromLocalStorage = (gameType: string): number => {
  const key = getLocalStorageKey(gameType);

  return Number(localStorage.getItem(key));
};

export const setRockPaperGameScoreToLocalStorage = (gameType: string, score: number) => {
  const key = getLocalStorageKey(gameType);

  if (getRockPaperGameScoreFromLocalStorage(gameType) !== score) {
    localStorage.setItem(key, String(score));
  }
};
