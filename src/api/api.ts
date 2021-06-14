import { IWinner } from '../shared/i-winner';
import { ICar } from '../shared/i-car';
import store from '../store/store';

interface IResponse {
  count: string;
  items: Array<ICar>;
}

const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page = 1, limit = 7): Promise<IResponse> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<void> =>
  (await fetch(`${garage}/${id}`)).json();

export interface IBody {
  name: string;
  color: string;
}

export const createCar = async (body: IBody): Promise<void> =>
  (
    await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const deleteCar = async (id: number): Promise<void> =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: IBody): Promise<void> =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

interface ISpeedDistance {
  velocity: number;
  distance: number;
}

export const startEngine = async (id: number): Promise<ISpeedDistance> =>
  (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number): Promise<void> =>
  (await fetch(`${engine}?id=${id}&status=stopped`)).json();

interface ISuccesFalse {
  success: boolean;
}

export const drive = async (id: number): Promise<ISuccesFalse> => {
  const response = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return response.status !== 200
    ? { success: false }
    : { ...(await response.json()) };
};

export const getSortOrder = (sort: string, order: string): string => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export interface IWinnerBody {
  id: number;
  wins: number;
  time: number;
}

interface IWinnersResponse {
  count: string;
  items: Array<IWinner>;
}

export const getWinners = async (
  page = 1,
  sort: 'id' | 'wins' | 'time' = 'time',
  order: 'ASC' | 'DESC' = 'ASC'
): Promise<IWinnersResponse> => {
  const limit = 10;
  store.sortBy = sort;
  store.sortOrder = order;
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`
  );
  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: { id: number }) => ({
        ...winner,
        car: await getCar(winner.id),
      }))
    ),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<IWinnerBody> =>
  (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> =>
  (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id: number): Promise<IWinnerBody> =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: IWinnerBody): Promise<IWinnerBody> =>
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateWinner = async (
  id: number,
  body: IWinnerBody
): Promise<IWinner> =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async (id: number, time: number): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = getWinner(id);
    await updateWinner(id, {
      id,
      wins: ((await winner).wins += 1),
      time: time < (await winner).time ? time : (await winner).time,
    });
  }
};
