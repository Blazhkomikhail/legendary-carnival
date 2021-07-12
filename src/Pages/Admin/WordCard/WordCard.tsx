import React from "react";

const WordCard = (props: any) => {
  const { word, translation, sound } = props;

  const soundHandler = () => {
    const audio = new Audio(sound);
    audio.play();
  }

  return (
    <div className="admin__card">
      <div className="admin__card-word">Word: {word}</div>
      <div className="admin__card-translation">Translation: {translation}</div>
      <span className="admin__card-audio">Sound:</span>
      <button 
        type="button" 
        className="admin__card-audio-icon"
        onClick={soundHandler}
      > Sound icon</button>
      <div className="admin__card-image">Image:</div>
      <span className="admin__card-image-icon"> Image icon</span>
    </div>
  )
}

export default WordCard;