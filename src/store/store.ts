// import { getCars, getWinners } from '../api/api';
import { ICar } from '../shared/i-car';
import { IWinner } from '../shared/i-winner';

let cars: Array<ICar>;
let carsCount: string;
let winners: Array<IWinner>;
let winnersCount: string;

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  sortBy: null,
  sortOrder: null,
};
