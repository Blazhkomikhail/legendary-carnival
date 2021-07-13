import React, { ReactElement } from "react";
import './newCardModal.scss';

const newCardModal = (
  cancelHandler: () => void,
  changeWordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  changeTranslationHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  changeNewSoundSrc: (event: React.ChangeEvent<HTMLInputElement>) => void,
  submitHandle: () => void,
  ref: React.Ref<HTMLInputElement>
  ): ReactElement => {

  return (
    <div className="card-modal">
      <div className="card-modal__window">
        <form onSubmit={submitHandle}>
            <label>
              Word:
              <input 
                type="text" 
                onChange={event => changeWordHandler(event)}
              />
            </label>
            <label>
              Translation:
              <input 
                type="text"
                onChange={event => changeTranslationHandler(event)}
              />
            </label>
            <label>
              Sound:
              <input 
                type="text"
                onChange={event => changeNewSoundSrc(event)}
              />
            </label>
            <label>
              Image:
              <input 
                type="file"
                ref={ref}
              />
            </label>
            <button 
              className="card-modal__cancel-button" 
              type="button"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <input className="card-modal__create-button" type="submit" value="Create"/>
          </form>
        </div>
      </div>
  )
}

export default newCardModal;