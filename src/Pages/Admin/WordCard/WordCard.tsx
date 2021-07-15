import React, { useState, useRef, ReactElement } from 'react';
import { deleteCardById, udateCard } from '../../../api/api';

type MyProps = {
  word: string;
  translation: string;
  sound: string;
  picture: string;
  id: string;
};

const WordCard = (props: MyProps): ReactElement => {
  const { word, translation, sound, picture, id } = props;

  const [isPictureShowed, setIsPictureShowed] = useState(false);
  const [isCardDeleted, setCardIsDeleted] = useState(false);
  const [isRedactMode, setIsRedactMode] = useState(false);
  const [newWord, setNewWord] = useState(word);
  const [newTranslation, setNewTranslation] = useState(translation);
  const [newSoundSrc, setNewSoundSrc] = useState(sound);
  const fileInput = useRef<HTMLInputElement>();

  const soundHandler = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  const deleteCardHandler = async () => {
    await deleteCardById(id);
    setCardIsDeleted(true);
  };

  const submitHandle = async () => {
    const formData = new FormData();
    formData.append('picture', fileInput.current.files[0]);
    formData.set('word', newWord);
    formData.set('_id', id);
    formData.set('translation', newTranslation);
    formData.set('sound', newSoundSrc);

    try {
      await udateCard(formData);
      setIsRedactMode(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const cardContent = () => {
    if (!isRedactMode) {
      return (
        <>
          <div className="admin__card-word">Word: {word}</div>
          <div className="admin__card-translation">
            Translation: {translation}
          </div>
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
              onMouseOver={() => setIsPictureShowed(true)}
              onFocus={() => setIsPictureShowed(true)}
              onMouseLeave={() => setIsPictureShowed(false)}
              style={{ backgroundImage: `url('icons/image-icon.png')` }}
            />
            {isPictureShowed ? (
              <div
                className="admin__card-image"
                style={{
                  backgroundImage: `url(${picture || 'img/no-img.png'})`,
                }}
              />
            ) : null}
          </div>
          <div
            role="presentation"
            className="admin__remove-icon"
            onClick={deleteCardHandler}
            style={{ backgroundImage: `url('icons/delete-icon.jpg')` }}
          />
          <div
            role="presentation"
            className="admin__edit-icon"
            onClick={() => setIsRedactMode(true)}
            style={{ backgroundImage: `url('icons/edit-icon.png')` }}
          />
        </>
      );
    }
    return (
      <form onSubmit={submitHandle}>
        <label>
          Word:
          <input
            type="text"
            value={newWord}
            onChange={(event) => setNewWord(event.target.value)}
          />
        </label>
        <label>
          Translation:
          <input
            type="text"
            value={newTranslation}
            onChange={(event) => setNewTranslation(event.target.value)}
          />
        </label>
        <label>
          Sound:
          <input
            type="text"
            value={newSoundSrc}
            onChange={(event) => setNewSoundSrc(event.target.value)}
          />
        </label>
        <label>
          Image:
          <input type="file" ref={fileInput} />
        </label>
        <button
          className="admin__card-redact-cancel-btn"
          type="button"
          onClick={() => setIsRedactMode(false)}
        >
          Cancel
        </button>
        <button className="admin__card-redact-update-btn" type="submit">
          Update
        </button>
      </form>
    );
  };

  return (
    <div
      className={`admin__card ${isCardDeleted ? ' admin__card_deleted' : ''}`}
    >
      {cardContent()}
    </div>
  );
};

export default WordCard;
