import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { cardSets } from '../../assets/cards';
import { RouteComponentProps } from 'react-router';
import { useSelector } from 'react-redux';


type MatchId = {
  id: string 
}

// type GameItems = {
//   name: string,
//   sound: string
// }

const MainField = ( { match }: RouteComponentProps<MatchId> ) => {
  const mode = useSelector(state => state);
  useEffect(() => getItems(),[]);

  const [items, setItems] = useState([]);
  const [guessItems, setGuessItems] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  // let gameItems: Array<GameItems> = [];

  const getItems = () => {
    const cardsItems = cardSets.find(set => set.id.toString() === match.params.id);
    const gameItems = cardsItems.items.map(item => {
      return {
        name: item.word,
        sound: item.audioSrc
      }
    });
    if (!cardsItems) return;
    setItems(cardsItems.items);
    setGuessItems(gameItems);
  }

  const handlePlay = () => {
    if (!guessItems.length) {
      console.log('Game over');
      return;
    }

    const randomIdx = Math.floor(Math.random() * guessItems.length);
    setCurrentWord(guessItems[randomIdx].name);
    const soundSrc = guessItems[randomIdx].sound;
    const audio = new Audio(soundSrc);
    audio.play();
  }

  const handleCardMatch = () => {
    setGuessItems(currentState => currentState.filter(item => item.name !== currentWord));
    handlePlay();
    console.log(guessItems, currentWord);
  }

  const cardsComponents = items.map(item => {
    return <Card key={item.id}
      word={item.word} 
      image={item.image}
      translation={item.translation}
      audioSrc={item.audioSrc}
      gameItem={currentWord}
      matchHandler={handleCardMatch}
    />
  });

  return (
    <main className="main-field">
      <div className="main-field__stars-wrapper"></div>
      <div className="main-field__cards-wrapper">
        { cardsComponents }
      </div>
      { mode === 'GAME' ? 
        <button className="game__play-button" onClick={handlePlay}>Play</button> 
        : null
      }
    </main>
  )
}

export default MainField;