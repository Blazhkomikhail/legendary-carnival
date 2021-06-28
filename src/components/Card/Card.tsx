import React, { useState } from "react";
import { useSelector } from 'react-redux';
import './card.scss';

type MyProps = {
  word: string;
  image: string;
  translation: string;
  audioSrc: string;
  gameItem: string;
  matchHandler: () => void;
};

const Card = (props: MyProps) => {
    const mode = useSelector(state => state);
    const { word, image, translation, audioSrc, gameItem, matchHandler } = props;
    const [isFlipped, setFlip] = useState(false);
    // const [isActive] = useState(true);

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
        matchHandler();
      }
    }

    return (
      <div className={"card__wrap"  + (isFlipped ? ' flipped' : '')}>
        <div className="card">
          <div className="card__front">
            <div className="card__image" data-name={ word } onClick={
              () => (mode === 'TRAIN' ? handleTrainCardClick() : handleGameCardClick(event))}
              style={{ backgroundImage: `url(${ image })` }}></div>
            <div className="card__bottom-wrap">
              <div className="card__name">{ word }</div>
              <div className="card__flip-button" onClick={handleFlip}>flip</div>
            </div>
          </div>
          <div className="card__back" onMouseLeave={() => handleCardMouseleave()}>
            <span className="card__translation">{ translation }</span>
          </div>
        </div>
      </div>
    )
};

export default Card;