import React, { useState } from "react";
import { deleteCardById } from '../../../api/api';

const WordCard = (props: any) => {
  const [isPictureShowed, setIsPictureShowed] = useState(false);
  const [isCardDeleted, setCardIsDeleted] = useState(false);
  const { word, translation, sound, picture, id } = props;

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

  const deleteCardHandler = async () => {
    await deleteCardById(id);
    setCardIsDeleted(true);
  }

  return (
    <div className={`admin__card ${isCardDeleted ? ' admin__card_deleted' : ''}` }>
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
      <span 
        className="admin__remove-icon"
        onClick={deleteCardHandler}
        style={{ backgroundImage: `url('icons/delete-icon.jpg')` }}
        />
    </div>
  )
}

export default WordCard;