import React from "react";

type MyProps = {
  word: string;
  image: string;
  sound: string;
};

const Card = (props: MyProps) => {
    const { word, image, sound } = props;
    const audio = new Audio(sound);
    const play = () => audio.play();
    return (
      <div className="category-card" onClick={() => play() }>
        <img src = { image } className="category-card__image" alt=""/> 
        <div className="category-card__name">{ word }</div>
        <div className="category-card__flip-button">flip</div>
      </div>
    )
};

export default Card;