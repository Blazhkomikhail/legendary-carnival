import React, { useState, useEffect, ReactElement } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card/Card';
import { cardSets } from '../../assets/cards';
import { game } from '../../actions/modeActions';
import SuccessGame from './SuccessGame/SuccessGame';
import FailureGame from './FailureGame/FailureGame';
import './mainField.scss';

type MatchId = {
  id: string;
};

const MainField = ({ match }: RouteComponentProps<MatchId>): ReactElement => {
  const mode = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [guessItems, setGuessItems] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [isGameStartded, setIsGameStarted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [stars, setStars] = useState([]);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const getItems = () => {
      const cardsItems = cardSets.find(
        (set) => set.id.toString() === match.params.id
      );
      if (!cardsItems) return;

      const gameItems = cardsItems.items.map((item) => {
        return {
          name: item.word,
          sound: item.audioSrc,
        };
      });

      setItems(cardsItems.items);
      setGuessItems(gameItems);
    };

    getItems();
  }, [match.params.id]);

  const handlePlay = () => {
    if (!guessItems.length) {
      setGameOver(true);
      dispatch(game());
      const REDIRECTION_TIME_DELAY = 4000;
      setTimeout(() => {
        history.push('/');
        window.location.reload();
      }, REDIRECTION_TIME_DELAY);
      return;
    }

    setIsGameStarted(true);

    const randomIdx = Math.floor(Math.random() * guessItems.length);
    setCurrentWord(guessItems[randomIdx].name);
    const soundSrc = guessItems[randomIdx].sound;
    const audio = new Audio(soundSrc);
    audio.currentTime = 0;
    audio.play();
  };

  const succesStar = (
    <div
      className="main-field__success-star"
      key={stars.length}
      style={{ backgroundImage: `url('img/star-win.svg')` }}
    />
  );

  const errorStar = (
    <div
      className="main-field__error-star"
      key={stars.length}
      style={{ backgroundImage: `url('img/star.svg')` }}
    />
  );

  const handleCardMatch = () => {
    setGuessItems((currentState) =>
      currentState.filter((item) => item.name !== currentWord)
    );
    setStars(stars.concat(succesStar));
  };

  const handleCardNotMatch = () => {
    if (isGameStartded) {
      setStars(stars.concat(errorStar));
      setErrors(errors + 1);
    }
  };

  useEffect(() => {
    if (isGameStartded) {
      handlePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessItems]);

  const cardsComponents = items.map((item) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        word={item.word}
        image={item.image}
        translation={item.translation}
        audioSrc={item.audioSrc}
        gameItem={currentWord}
        successMatchHandler={handleCardMatch}
        errorMatchHandler={handleCardNotMatch}
      />
    );
  });

  const gameOverHandle = () => {
    if (!isGameOver) {
      return cardsComponents;
    }
    return errors ? <FailureGame errors={errors} /> : <SuccessGame />;
  };

  return (
    <main className="main-field">
      <div className="main-field__stars-wrapper">{stars}</div>
      <div className="main-field__cards-wrapper">{gameOverHandle()}</div>
      {mode === 'GAME' ? (
        <button
          type="button"
          disabled={isGameStartded}
          className="game__play-button"
          onClick={handlePlay}
        >
          Play
        </button>
      ) : null}
    </main>
  );
};

export default MainField;
