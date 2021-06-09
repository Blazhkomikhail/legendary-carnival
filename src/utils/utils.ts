import Component from '../components/base-component';

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
