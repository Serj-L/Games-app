/* eslint-disable no-unused-vars */

/* Common */
export enum RoutesEnum {
  GAMES_LIST = '/',
  ROCK_PAPER_GAME = 'rockPaper/:gameType',
  ROCK_PAPER_GAME_ENDPOINT = 'rockPaper/',
  REDIRECT_PATH = '/',
}

export enum LocalStorageKeys {
  ROCK_PAPER_NORMAL_GAME_SCORE = 'GamesAppRockPaperNormalGameScore',
  ROCK_PAPER_EXTENDED_GAME_SCORE = 'GamesAppRockPaperExtendedGameScore',
}

/* Rock-Paper-Scissors Game */
export enum RockPaperGameTypes {
  NORMAL = 'normal',
  EXTENDED = 'extended',
}

export type RockPaperGameItemName = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

export interface IRockPaperGameItem {
  name: RockPaperGameItemName,
  beats: RockPaperGameItemName[],
}
export interface IRockPaperGameChoosenItem {
  player: RockPaperGameItemName,
  ai: RockPaperGameItemName,
}
