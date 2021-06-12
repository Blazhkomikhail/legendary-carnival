// import { getCars, getWinners } from '../api/api';
import { ICar } from '../shared/i-car';
import { IWinner } from '../shared/i-winner';

interface IAnimation {
  [key: number]: Animation;
}

let cars: Array<ICar>;
let carsCount: string;
let winners: Array<IWinner>;
let winnersCount: string;
const animation: IAnimation = {};

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  animation,
  sortBy: null,
  sortOrder: null,
};
