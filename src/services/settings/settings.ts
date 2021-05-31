export const MESSAGE_TIME = 2000;
export const START_GAME_DELAY = 3000;
export const FLIP_CARDS_DELAY = 1000;
export const gameSettings: ISettings = {
  cards: 'dogs',
  level: 'middle',
};
interface ISettings {
  [key: string]: string;
}
