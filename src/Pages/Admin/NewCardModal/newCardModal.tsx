import React, { ReactElement, useState, useRef } from 'react';
import { createCard } from '../../../api/api';
import './newCardModal.scss';

type MyProps = {
  categoryName: string;
  cancelHandler: () => void;
};

const NewCardModal = (props: MyProps): ReactElement => {
  const { categoryName, cancelHandler } = props;
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newSoundSrc, setNewSoundSrc] = useState('');
  const fileInput = useRef<HTMLInputElement>();

  const submitModalHandler = async () => {
    const formData = new FormData();
    formData.append('picture', fileInput.current.files[0]);
    formData.set('word', newWord);
    formData.set('translation', newTranslation);
    formData.set('audioSrc', newSoundSrc);
    formData.set('categoryName', categoryName);

    try {
      await createCard(formData);
      cancelHandler();
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="card-modal">
      <div className="card-modal__window">
        <form className="card-modal__form" onSubmit={submitModalHandler}>
          <label>
            Word:
            <input
              type="text"
              onChange={(event) => setNewWord(event.target.value)}
            />
          </label>
          <label>
            Translation:
            <input
              type="text"
              onChange={(event) => setNewTranslation(event.target.value)}
            />
          </label>
          <label>
            Sound:
            <input
              type="text"
              onChange={(event) => setNewSoundSrc(event.target.value)}
            />
          </label>
          <label>
            Image:
            <input type="file" ref={fileInput} />
          </label>
          <div className="card-modal__button-wrap">
            <button
              className="card-modal__cancel-button"
              type="button"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <input
              className="card-modal__create-button"
              type="submit"
              value="Create"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCardModal;
