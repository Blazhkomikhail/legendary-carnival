import React from "react";

type MyProps = {
  word: string;
  image: string;
  onClick: () => void;
};

const Card = (props: MyProps) => {
    const { word, image, onClick } = props;
    return (
      <div className="category-card" onClick={() => onClick() }>
        <img src = { image } className="category-card__image" alt=""/> 
        <div className="category-card__name">{ word }</div>
        <div className="category-card__flip-button">flip</div>
      </div>
    )
};

export default Card;