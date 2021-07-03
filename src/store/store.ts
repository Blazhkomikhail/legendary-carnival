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
const DEF_INP_COLOR = '#5d72bb';
const inputData = {
  name: '',
  color: '#5d72bb',
  id: 0,
};
const garageInputType = 'create';

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
  inputData,
  DEF_INP_COLOR,
  garageInputType,
};
