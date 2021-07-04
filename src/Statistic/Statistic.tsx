import React from "react";
import { categoryData, cardSets } from '../assets/cards';
import type { DefaultRootState } from 'react-redux';

interface IStorageItem {
  id: number,
  word: string,
  translation: string,
  statistic: {
    trainClickCount: number,
    game: {
      successCount: number,
      errorCount: number
    }
  }
}

interface IStorageSet {
  id: number,
  categoryName: string,
  items: Array<IStorageItem>
}

const getStorageData = (): Array<IStorageSet>  => {
  return JSON.parse(localStorage.getItem('statistic'));
}

export const updateStatistic = (id: number, mode: DefaultRootState, isMatched: boolean | null = null) => {
  const sets = getStorageData();

  sets.forEach(set => {
    set.items.forEach(item => {
      if (item.id !== id) return;
      
      if (mode === 'TRAIN') {
        item.statistic.trainClickCount += 1;
      } else {
        isMatched ? 
          item.statistic.game.successCount += 1 : 
          item.statistic.game.errorCount += 1;
      }
    })
  })
  localStorage.setItem('statistic', JSON.stringify(sets));
}

export const Statistic = () => {

  const storageData = cardSets.map(set => {
    return {
      id: set.id,
      categoryName: categoryData.find(cat => cat.id === set.id).name,
      items: set.items.map(item => {
        return {
          id: item.id,
          word: item.word,
          translation: item.translation,
          statistic: {
            trainClickCount: 0,
            game: {
              successCount: 0,
              errorCount: 0
            },
          }
        }
      })
    }
  })

  if (!localStorage.getItem('statistic')) {
    localStorage.setItem('statistic', JSON.stringify(storageData));
  }

  const createTableBody = () => {
    const categorySets = getStorageData();
    return (
      <>
        {
          categorySets.map((set: IStorageSet) => { 
          return (
            set.items.map(item => {
              return (
                <tr key={set.id + item.id}>
                  <td>{set.categoryName}</td>
                  <td>{item.word}</td>
                  <td>{item.translation}</td>
                  <td>{item.statistic.trainClickCount}</td>
                  <td>{item.statistic.game.successCount}</td>
                  <td>{item.statistic.game.errorCount}</td>
                  <td>{
                    item.statistic.game.successCount === 0 || item.statistic.game.errorCount === 0 ?
                    '-' : (item.statistic.game.successCount / 
                    (item.statistic.game.successCount + item.statistic.game.errorCount) * 100).toFixed() 
                    + '%'
                  }</td>
                </tr>
              )
            })
          )
        })
       }
      </>
    )
  }

  return (
    <>
      <h1 className="statistic-heading">Statistic</h1>
      <div className="statistic-tabel">
        <table>
          <thead>
            <tr>
              <td>Category</td>
              <td>Word</td>
              <td>Translation</td>
              <td>Train clicks</td>
              <td>Guesses</td>
              <td>Mistakes</td>
              <td>Guess percent</td>
            </tr>
          </thead>
          <tbody>
            {createTableBody()}
          </tbody>
        </table>
      </div>
    </>
  )
}