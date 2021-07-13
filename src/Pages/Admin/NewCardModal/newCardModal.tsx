import React, { ReactElement, useState } from "react";
import './newCardModal.scss';

const newCardModal = (cancelModalHandler: () => void): ReactElement => {
  const [newWord, setNewWord] = useState('');
  // const [newTranslation, setNewTranslation] = useState('');
  // const [newSoundSrc, setNewSoundSrc] = useState('');
  // const fileInput = useRef<HTMLInputElement>();

  const changeWordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(e.target.value);
  }
  console.log(newWord);

  // const submitHandle = (event: Event) => {
  //   event.preventDefault();
  //   const word = newWord;
  //   const translation = newTranslation;
  //   const sound = newSoundSrc;
  //   const picture = fileInput.current.files[0];
  //   console.log(word, translation, sound, picture);
  // }

  return (
    <div className="card-modal">
      <div className="card-modal__window">
        <form>
            <label>
              Word:
              <input 
                type="text" 
                onChange={changeWordHandler}
              />
            </label>
            <label>
              Translation:
              <input 
                type="text"
                // onChange={event => setNewTranslation(event.target.value)}
              />
            </label>
            <label>
              Sound:
              <input 
                type="text"
                // onChange={event => setNewSoundSrc(event.target.value)}
              />
            </label>
            <label>
              Image:
              <input 
                type="file"
              />
            </label>
            <button 
              className="card-modal__cancel-button" 
              type="button"
              onClick={cancelModalHandler}
            >
              Cancel
            </button>
            <button className="card-modal__create-button" type="submit">Create</button>
          </form>
        </div>
      </div>
  )
}

export default newCardModal;