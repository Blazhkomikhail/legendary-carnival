import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { cardSets } from '../../assets/cards';
import { RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { game } from '../../actions/modeActions';
import SuccessGame from './SuccessGame/SuccessGame';
import FailureGame from './FailureGame/FailureGame';
import './mainField.scss';


type MatchId = {
  id: string 
}

const MainField = ( { match }: RouteComponentProps<MatchId> ) => {
  const mode = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => getItems(),[]);

  const [items, setItems] = useState([]);
  const [guessItems, setGuessItems] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [isGameStartded, setIsGameStarted] = useState(false);
  const [stars, setStars] = useState([]);
  const [isGameOver, setGameOver] = useState(false);
  const [errors, setErrors] = useState(0);

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
      setGameOver(true);
      dispatch(game());
      return;
    }

    setIsGameStarted(true);

    const randomIdx = Math.floor(Math.random() * guessItems.length);
    setCurrentWord(guessItems[randomIdx].name);
    const soundSrc = guessItems[randomIdx].sound;
    const audio = new Audio(soundSrc);
    audio.play();
  }

  const succesStar = (
    <div className="main-field__success-star" key={stars.length}
      style={{ backgroundImage: `url('img/star-win.svg')` }}
    />
  );

  const errorStar = (
    <div className="main-field__error-star" key={stars.length}
      style={{ backgroundImage: `url('img/star.svg')` }}
    />
  );

  const handleCardMatch = () => {
    setGuessItems(currentState => currentState.filter(item => item.name !== currentWord));
    setStars(stars.concat(succesStar));
  }

  const handleCardNotMatch = () => {
    if (isGameStartded) {
      setStars(stars.concat(errorStar));
      setErrors(errors => errors += 1);
    }
  }

  useEffect(() => {
    if (isGameStartded) {
      handlePlay();
    }
  }, [guessItems]);

  const cardsComponents = items.map(item => {
    return <Card key={item.id}
      word={item.word} 
      image={item.image}
      translation={item.translation}
      audioSrc={item.audioSrc}
      gameItem={currentWord}
      successMatchHandler={handleCardMatch}
      errorMatchHandler={handleCardNotMatch}
    />
  });

  return (
    <main className="main-field">
      <div className="main-field__stars-wrapper">
        { stars }
      </div>
      <div className="main-field__cards-wrapper">
        { !isGameOver ? 
          cardsComponents : ( 
            errors ? 
              <FailureGame errors={errors}/> : 
              <SuccessGame/>
          ) 
        }
      </div>
      { mode === 'GAME' ? 
        <button className="game__play-button" onClick={handlePlay}>Play</button> 
        : null
      }
    </main>
  )
}

export default MainField;