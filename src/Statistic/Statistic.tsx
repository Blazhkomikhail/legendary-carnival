import React, { ReactNode, useState, useMemo, ReactElement } from 'react';
import type { DefaultRootState } from 'react-redux';
import { categoryData, cardSets } from '../assets/cards';
import './statistic.scss';

interface IStorageItem {
  id: number;
  category: string;
  word: string;
  translation: string;
  trainClick: number;
  guesses: number;
  mistakes: number;
}

const getStorageData = (): Array<IStorageItem> => {
  return JSON.parse(localStorage.getItem('statistic'));
};

export const updateStatistic = (
  id: number,
  mode: DefaultRootState,
  isMatched: boolean | null = null
): void => {
  const items = getStorageData();

  items.forEach((item) => {
    if (item.id !== id) return;

    const innerItem = item;
    if (mode === 'TRAIN') {
      innerItem.trainClick += 1;
      return;
    }

    if (isMatched) {
      innerItem.guesses += 1;
    } else {
      innerItem.mistakes += 1;
    }
  });
  localStorage.setItem('statistic', JSON.stringify(items));
};

const createTableBody = (): Array<ReactNode> => {
  const items = getStorageData();
  return items.map((item: IStorageItem) => {
    return (
      <tr key={item.id}>
        <td>{item.category}</td>
        <td>{item.word}</td>
        <td>{item.translation}</td>
        <td>{item.trainClick}</td>
        <td>{item.guesses}</td>
        <td>{item.mistakes}</td>
        <td>
          {item.guesses === 0 || item.mistakes === 0
            ? '-'
            : `${(
                (item.guesses / (item.guesses + item.mistakes)) *
                100
              ).toFixed()}%`}
        </td>
      </tr>
    );
  });
};

const createStorageData = () => {
  const storageData = cardSets.map((set) => {
    return set.items.map((item) => {
      return {
        category: categoryData.find((cat) => cat.id === set.id).name,
        id: item.id,
        word: item.word,
        translation: item.translation,
        trainClick: 0,
        guesses: 0,
        mistakes: 0,
      };
    });
  });
  const flated = [].concat(...storageData);
  return flated;
};

export const Statistic = (): ReactElement => {
  // const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  if (!localStorage.getItem('statistic')) {
    const storageData = createStorageData();
    localStorage.setItem('statistic', JSON.stringify(storageData));
  }
  
  const items = getStorageData();
 
  const resetHandler = () => {
    const items = getStorageData();
    const clearItems = items.map(item => {
      return {
        category: item.category,
        id: item.id,
        word: item.word,
        translation: item.translation,
        trainClick: 0,
        guesses: 0,
        mistakes: 0,
      }
    })
    localStorage.setItem('statistic', JSON.stringify(clearItems));
    window.location.reload();
  }

  useMemo(() => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      if ((a as any)[sortConfig.key] < (b as any)[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      if ((a as any)[sortConfig.key] > (b as any)[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      return 0;
    });
    localStorage.setItem('statistic', JSON.stringify(sortedItems));
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="statistic">
      <h1 className="statistic__heading">Your statistic</h1>
      <div className="statistic__buttons-wrap">
        <button className="statistic__repeat-btn" type="button">Repeat difficult words</button>
        <button 
        type="button" 
        className="statistic__reset-btn"
        onClick={resetHandler}
        >Reset</button>
      </div>
      <div className="statistic__tabel-wrap">
        <table className="statistic__tabel">
          <thead>
            <tr>
              <th onClick={() => requestSort('category')}>Category</th>
              <th onClick={() => requestSort('word')}>Word</th>
              <th onClick={() => requestSort('translation')}>Translation</th>
              <th onClick={() => requestSort('trainClick')}>Train clicks</th>
              <th onClick={() => requestSort('guesses')}>Guesses</th>
              <th onClick={() => requestSort('mistakes')}>Mistakes</th>
              <th onClick={() => requestSort('percent')}>Guess percent</th>
            </tr>
          </thead>
          <tbody className="statistic__tabel-body">{createTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};
