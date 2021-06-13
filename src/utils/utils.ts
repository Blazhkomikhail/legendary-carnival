import Component from '../components/base-component';
import { getWinners } from '../api/api';
import store from '../store/store';

export const paginationButtonsDisable = (
  prevBtn: Component,
  nextBtn: Component,
  carsCount: string,
  currentPage: number
) => {
  const pageCarsLimit = 7;
  const lastPageNum = Math.ceil(Number(carsCount) / pageCarsLimit);
  const next = nextBtn;
  const prev = prevBtn;
  if (Number(carsCount) <= pageCarsLimit) {
    (prev.element as HTMLButtonElement).disabled = true;
    (next.element as HTMLButtonElement).disabled = true;
  } else if (currentPage < 2) {
    (prev.element as HTMLButtonElement).disabled = true;
  } else if (lastPageNum === currentPage) {
    (next.element as HTMLButtonElement).disabled = true;
  }
};

export const getRandomName = () => {
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
    'C-klass',
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

export const getRandomColor = () => {
  const letters = 'abcdef0123456789';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomCars = (count = 10) => {
  return new Array(count)
    .fill(null)
    .map(() => ({ name: getRandomName(), color: getRandomColor() }));
};

const getPositionAtCenter = (element: HTMLElement) => {
  const { left, top, width, height } = element.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const calcDistanceStartFinish = (a: HTMLElement, b: HTMLElement) => {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
};

export const animation = (
  car: Component,
  distance: string,
  animationTime: number
) => {
  const carMotion = [
    { transform: `translateX(0)` },
    { transform: `translateX(${distance})` },
  ];

  const motionTiming = {
    duration: animationTime,
    fill: 'forwards' as any,
  };

  const movedCar = car.element.animate(carMotion, motionTiming);
  return movedCar;
};

export const updadeWinnersStore = async (
  page: number = store.winnersPage, 
  sortBy: 'id' | 'wins' | 'time' = 'time',
  sortOrder: 'ASC' | 'DESC' = 'ASC'
  ) => {
  const winners = await getWinners(page, sortBy, sortOrder);
  store.winnersCount = winners.count;
  store.winners = winners.items;
}

export const constructPaginationBtns = (
  parent: HTMLElement, 
  prevHandle: ()=>void, 
  nextHandle: ()=>void,
  itemsCount: string,
  currentPage: number,
  context: Component
  ) => {
  const self = context;
  const paginationBox = new Component(parent, 'div', [
    'pagination-box',
  ]);
  const prev = new Component(paginationBox.element, 'button', [], 'Prev');
  const next = new Component(paginationBox.element, 'button', [], 'Next');
  prev.element.addEventListener('click', () => prevHandle.call(self));
  next.element.addEventListener('click', () => nextHandle.call(self));
  paginationButtonsDisable(prev, next, itemsCount, currentPage);
}


