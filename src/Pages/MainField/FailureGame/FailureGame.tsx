import React, { ReactElement } from 'react';

interface ErrorCount {
  errors: number;
}

const FailureGame = (props: ErrorCount): ReactElement => {
  const { errors } = props;
  const audio = new Audio('audio/failure.mp3');
  audio.play();

  return (
    <div className="failure-game">
      <h2 className="failure-game__heading">
        What a pity. You did {errors} errors.{' '}
      </h2>
      <img
        className="failure-game__image"
        src="img/failure-unicorn.png"
        alt="Succes unicorn"
      />
    </div>
  );
};

export default FailureGame;
