import { ICar } from './i-car';

export interface IWinner {
  id: number;
  time: number;
  wins: number;
  car: ICar;
}
