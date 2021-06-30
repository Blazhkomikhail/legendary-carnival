import React from "react";

interface errorCount {
  errors: number;
} 

const FailureGame = (props: errorCount) => {
  const { errors } = props;
  return (
    <div className="failure-game">
      <h2 className="failure-game__heading">What a pity. You did { errors } errors. </h2>
      <img className="failure-game__image" src="img/failure-unicorn.png" alt="Succes unicorn" />
    </div>
  )
}

export default FailureGame;