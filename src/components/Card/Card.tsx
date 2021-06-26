import React, { useState } from "react";
import './card.scss';

type MyProps = {
  word: string;
  image: string;
  translation: string;
  onCardClick: () => void;
};

const Card = (props: MyProps) => {
    const { word, image, onCardClick, translation } = props;
    const [isFlipped, setFlip] = useState(false);

    const onFlipClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      setFlip(current => !current);
    }

    const onFlipMouseleave = () => {
      if (!isFlipped) return;
      setFlip(current => !current);
    }

    return (
      <div className={"card__wrap"  + (isFlipped ? ' flipped' : '')}>
        <div className="card">
          <div className="card__front">
            <div className="card__image" onClick={() => onCardClick()}
            style={ {backgroundImage: `url(${ image })`}}></div>
            <div className="card__bottom-wrap">
              <div className="card__name">{ word }</div>
              <div className="card__flip-button" onClick={onFlipClick}>flip</div>
            </div>
          </div>
          <div className="card__back" onMouseLeave={() => onFlipMouseleave()}>
            <span className="card__translation">{ translation }</span>
          </div>
        </div>
      </div>
    )
};

export default Card;