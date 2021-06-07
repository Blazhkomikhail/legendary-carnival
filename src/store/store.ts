import { getCars, getWinners } from '../api/api';

const cars = async () => (await getCars(1)).items;
const carsCount = async () => (await getCars(1)).count;
const winners = async () => (await getWinners(1)).items;
const winnersCount = async () => (await getWinners(1)).count;

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  view: 'garage',
  sortBy: null,
  sortOrder: null
}