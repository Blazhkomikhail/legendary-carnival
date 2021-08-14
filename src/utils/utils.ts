import Component from '../components/baseComponent';
import { getWinners, getCars, IBody } from '../api/api';
import store from '../store/store';

export const getRandomName = (): string => {
  const models = [
    'Mercedes',
    'Audi',
    'Toyota',
    'Mazda',
    'BMW',
    'Ferrari',
    'Suzuki',
    'Skoda',
    'Fiat',
  ];
  const names = [
    'C-class',
    '3-series',
    'Corolla',
    'Swift',
    'Doblo',
    'F-150 Spider',
    'Super-b',
  ];
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
};

export const getRandomColor = (): string => {
  const letters = 'abcdef0123456789';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const carsNumber = 100;

export const generateRandomCars = (count = carsNumber): Array<IBody> => {
  return new Array(count)
    .fill(null)
    .map(() => ({ name: getRandomName(), color: getRandomColor() }));
};

interface ICoordinates {
  x: number;
  y: number;
}

const getPositionAtCenter = (element: HTMLElement): ICoordinates => {
  const { left, top, width, height } = element.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const calcDistanceStartFinish = (
  a: HTMLElement,
  b: HTMLElement
): number => {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
};

export const animation = (
  car: Component,
  distance: string,
  animationTime: number
): Animation => {
  const carMotion = [
    { transform: `translateX(0)` },
    { transform: `translateX(${distance})` },
  ];

  const motionTiming = {
    duration: animationTime,
    fill: 'forwards' as any, // it's seems like TS bug, I couldn't specify parameters form MDN Animation API
  };

  const movedCar = car.element.animate(carMotion, motionTiming);
  return movedCar;
};

export const updateWinnersStore = async (
  page: number = store.winnersPage,
  sortBy: 'id' | 'wins' | 'time' = 'time',
  sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<void> => {
  const winners = await getWinners(page, sortBy, sortOrder);
  store.winnersCount = winners.count;
  store.winners = winners.items;
};

export const updateGarageStore = async (
  page: number = store.carsPage
): Promise<void> => {
  const cars = await getCars(page);
  store.carsCount = cars.count;
  store.cars = cars.items;
};

export const updatePagesByDefault = () => {
  updateGarageStore();
  updateWinnersStore();
};

export const paginationButtonsDisable = (
  prevBtn: Component,
  nextBtn: Component,
  carsCount: string,
  currentPage: number,
  pageItemsLimit: number
): void => {
  const lastPageNum = Math.ceil(Number(carsCount) / pageItemsLimit);
  const next = nextBtn;
  const prev = prevBtn;
  if (Number(carsCount) <= pageItemsLimit) {
    (prev.element as HTMLButtonElement).disabled = true;
    (next.element as HTMLButtonElement).disabled = true;
  } else if (currentPage < 2) {
    (prev.element as HTMLButtonElement).disabled = true;
  } else if (lastPageNum === currentPage) {
    (next.element as HTMLButtonElement).disabled = true;
  }
};

export const constructPaginationBtns = (
  parent: HTMLElement,
  prevHandle: () => void,
  nextHandle: () => void,
  itemsCount: string,
  currentPage: number,
  context: Component,
  itemsLimit: number
): void => {
  const self = context;
  const paginationBox = new Component(parent, 'div', ['pagination-box']);
  const prev = new Component(paginationBox.element, 'button', [], 'Prev');
  const next = new Component(paginationBox.element, 'button', [], 'Next');
  prev.element.addEventListener('click', () => prevHandle.call(self));
  next.element.addEventListener('click', () => nextHandle.call(self));
  paginationButtonsDisable(prev, next, itemsCount, currentPage, itemsLimit);
};
