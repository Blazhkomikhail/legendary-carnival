import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateStatistic } from '../../Statistic/Statistic';
import './card.scss';

type MyProps = {
  id: number;
  word: string;
  image: string;
  translation: string;
  audioSrc: string;
  gameItem: string;
  successMatchHandler: () => void;
  errorMatchHandler: () => void;
};

const Card = (props: MyProps): ReactElement => {
  const mode = useSelector((state) => state);
  const {
    id,
    word,
    image,
    translation,
    audioSrc,
    gameItem,
    successMatchHandler,
    errorMatchHandler,
  } = props;
  const [isFlipped, setFlip] = useState(false);
  const [isActive, setActive] = useState(true);
  const handleFlip = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFlip((current) => !current);
  };

  const sound = (source: string) => {
    const audio = new Audio(source);
    audio.play();
  };

  const handleCardMouseleave = () => {
    if (!isFlipped) return;
    setFlip((current) => !current);
  };

  const handleTrainCardClick = () => {
    sound(audioSrc);
    updateStatistic(id, mode);
  };

  const handleGameCardClick = () => {
    const isMatch = word === gameItem;
    if (isMatch) {
      sound('audio/correct.mp3');
      setActive((currentState) => !currentState);
      updateStatistic(id, mode, isMatch);
      successMatchHandler();
    } else {
      sound('audio/error.mp3');
      updateStatistic(id, mode, isMatch);
      errorMatchHandler();
    }
  };

  return (
    <div
      className={`card__wrap${isFlipped ? ' flipped' : ''}${
        isActive ? ' card__wrap_hover' : ''
      }`}
    >
      <div className="card">
        <div className="card__front">
          {!isActive ? <div className="card__front_frontground" /> : null}
          <div
            role="presentation"
            className={`card__image${
              mode === 'GAME' ? ' card__image_game' : ''
            }`}
            onClick={() =>
              mode === 'TRAIN' ? handleTrainCardClick() : handleGameCardClick()
            }
            style={{ backgroundImage: `url(${image})` }}
          />
          {mode === 'TRAIN' ? (
            <div className="card__bottom-wrap">
              <div className="card__name">{word}</div>
              <div
                role="presentation"
                className="card__flip-button"
                onClick={handleFlip}
                style={{ backgroundImage: `url('img/rotate.svg')` }}
              />
            </div>
          ) : null}
        </div>
        <div className="card__back" onMouseLeave={() => handleCardMouseleave()}>
          <span className="card__translation">{translation}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
