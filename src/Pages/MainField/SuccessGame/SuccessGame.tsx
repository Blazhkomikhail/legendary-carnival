import React, { ReactElement } from 'react';

const SuccessGame = (): ReactElement => {
  const audio = new Audio('audio/success.mp3');
  audio.play();

  return (
    <div className="success-game">
      <h2 className="success-game__heading">Congrats! You are so clever.</h2>
      <img
        className="success-game__image"
        src="img/success-unicorn.png"
        alt="Succes unicorn"
      />
    </div>
  );
};

export default SuccessGame;
