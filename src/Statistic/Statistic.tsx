import React, { ReactNode, useState, useMemo } from "react";
import { categoryData, cardSets } from '../assets/cards';
import type { DefaultRootState } from 'react-redux';

interface IStorageItem {
  id: number,
  category: string,
  word: string,
  translation: string,
  trainClick: number,
  guesses: number,
  mistakes: number
}

const getStorageData = (): Array<IStorageItem>  => {
  return JSON.parse(localStorage.getItem('statistic'));
}

export const updateStatistic = (
  id: number, 
  mode: DefaultRootState, 
  isMatched: boolean | null = null
  ) => {
  const items = getStorageData();

  items.forEach(item => {
      if (item.id !== id) return;
      
      if (mode === 'TRAIN') {
        item.trainClick += 1;
      } else {
        isMatched ? 
          item.guesses += 1 : 
          item.mistakes += 1;
      }
    })
  localStorage.setItem('statistic', JSON.stringify(items));
}

const createTableBody = (items: Array<IStorageItem>): Array<ReactNode> => {
  return items.map((item: IStorageItem) => { 
    return (
      <tr key={item.id}>
        <td>{item.category}</td>
        <td>{item.word}</td>
        <td>{item.translation}</td>
        <td>{item.trainClick}</td>
        <td>{item.guesses}</td>
        <td>{item.mistakes}</td>
        <td>{
          item.guesses === 0 || item.mistakes === 0 ?
          '-' : (item.guesses / 
          (item.guesses + item.mistakes) * 100).toFixed() 
          + '%'
        }</td>
      </tr>
    )
  })
}

const createStorageData = () => {

  const storageData = cardSets.map(set => {
    return set.items.map(item => {
        return {
          category: categoryData.find(cat => cat.id === set.id).name,
          id: item.id,
          word: item.word,
          translation: item.translation,
          trainClick: 0,
          guesses: 0,
          mistakes: 0
        }
      })
    })
  const flated = [].concat.apply([], storageData); //TO DO: replace by flat(). Add es9 permission
  return flated;
}


export const Statistic = () => {
  const storageData = createStorageData();
  const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});

  if (!localStorage.getItem('statistic')) {
    localStorage.setItem('statistic', JSON.stringify(storageData));
  }

  const items = getStorageData();
  let sortedItems: Array<IStorageItem>;

  useMemo(() => {
    sortedItems = [...items];
    sortedItems.sort((a, b) => {
      if ((a as any)[sortConfig.key] < (b as any)[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      if ((a as any)[sortConfig.key] > (b as any)[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      return 0;
    })
  },[items, sortConfig])
  

  const requestSort = (key: string) => {
    let direction = 'ascending';
    console.log(sortConfig.key);
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  return (
    <>
      <h1 className="statistic-heading">Statistic</h1>
      <div className="statistic-tabel">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('category')} >Category</th>
              <th onClick={() => requestSort('word')} >Word</th>
              <th onClick={() => requestSort('translation')} >Translation</th>
              <th onClick={() => requestSort('trainClick')} >Train clicks</th>
              <th onClick={() => requestSort('guesses')} >Guesses</th>
              <th onClick={() => requestSort('mistakes')} >Mistakes</th>
              <th onClick={() => requestSort('percent')} >Guess percent</th>
            </tr>
          </thead>
          <tbody>
            {createTableBody(sortedItems)}
          </tbody>
        </table>
      </div>
    </>
  )
}