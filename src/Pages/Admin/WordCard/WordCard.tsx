import React, { useState } from "react";

const WordCard = (props: any) => {
  const [isPictureShowed, setIsPictureShowed] = useState(false);
  const { word, translation, sound, picture } = props;

  const soundHandler = () => {
    const audio = new Audio(sound);
    audio.play();
  }

  const imageMouseEnterHandler = () => {
    setIsPictureShowed(true);
  }

  const imageMouseLeaveHandler = () => {
    setIsPictureShowed(false);
  }

  return (
    <div className="admin__card">
      <div className="admin__card-word">Word: {word}</div>
      <div className="admin__card-translation">Translation: {translation}</div>
      <div className="admin__card-audio-wrap">
        <span className="admin__card-audio">Sound:</span>
        <span 
          role="presentation"
          className="admin__card-audio-icon"
          onClick={soundHandler}
          style={{ backgroundImage: `url('icons/sound-icon.png')` }}
        />
      </div>
      <div className="admin__card-image-wrapper">
        <div className="admin__card-image-title">Image:</div>
        <span 
          className="admin__card-image-icon"
          onMouseOver={imageMouseEnterHandler}
          onMouseLeave={imageMouseLeaveHandler}  
          style={{ backgroundImage: `url('icons/image-icon.png')` }}
        />
        {
          isPictureShowed ? (
            <div 
              className="admin__card-image"
              style={{ backgroundImage: `url(${picture})` }} />
          ) : null
        }
      </div>
    </div>
  )
}

export default WordCard;