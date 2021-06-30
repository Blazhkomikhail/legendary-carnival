import React, { useState } from "react";
import { useSelector } from 'react-redux';
import './card.scss';

type MyProps = {
  word: string;
  image: string;
  translation: string;
  audioSrc: string;
  gameItem: string;
  successMatchHandler: () => void;
  errorMatchHandler: () => void;
};

const Card = (props: MyProps) => {
    const mode = useSelector(state => state);
    const { word, image, translation, audioSrc, gameItem, successMatchHandler, errorMatchHandler } = props;
    const [isFlipped, setFlip] = useState(false);
    const [isActive, setActive] = useState(true);
    const handleFlip = (event: React.MouseEvent) => {
      event.stopPropagation();
      setFlip(current => !current);
    }

    const handleCardMouseleave = () => {
      if (!isFlipped) return;
      setFlip(current => !current);
    }

    const handleTrainCardClick = () => {
      const audio = new Audio(audioSrc);
      audio.play();
    }

    const handleGameCardClick = (event: Event) => {
      if (word === gameItem) {
        setActive(currentState => !currentState);
        successMatchHandler();
      } else {
        errorMatchHandler();
      }
    }

    return (
      <div className={
        "card__wrap"  + 
        (isFlipped ? ' flipped' : '') + 
        (isActive ? ' card__wrap_hover' : '') 
        }>
        <div className="card">
          <div className="card__front">
            { !isActive ? <div className="card__front_frontground"></div> : null }
            <div className={"card__image" + (mode === 'GAME' ? ' card__image_game' : '')} 
              onClick={
                () => mode === 'TRAIN' ? handleTrainCardClick() : handleGameCardClick(event)
              }
              style={{ backgroundImage: `url(${ image })` }}>
            </div>
            { mode === 'TRAIN' ?
            (<div className="card__bottom-wrap">
              <div className="card__name">{ word }</div>
              <div className="card__flip-button" onClick={handleFlip}>flip</div>
            </div>) : null
            }
          </div>
          <div className="card__back" onMouseLeave={() => handleCardMouseleave()}>
            <span className="card__translation">{ translation }</span>
          </div>
        </div>
      </div>
    )
};

export default Card;