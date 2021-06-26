import React from "react";

type MyProps = {
  word: string;
  image: string;
  translation: string;
  onCardClick: () => void;
  onFlipClick: () => void;
};

const Card = (props: MyProps) => {
    const { word, image, onCardClick, onFlipClick, translation } = props;
    return (
      <div className="category-card">
        <div className="category-card__front" onClick={() => onCardClick() }>
          <img src = { image } className="category-card__image" alt=""/> 
          <div className="category-card__name">{ word }</div>
          <div className="category-card__flip-button" onClick={(event) => {
            event.stopPropagation();
            onFlipClick();
          }}>flip</div>
        </div>
        <div className="category-card__back">
          <span className="category-card__translation">{ translation }</span>
        </div>
      </div>
    )
};

export default Card;