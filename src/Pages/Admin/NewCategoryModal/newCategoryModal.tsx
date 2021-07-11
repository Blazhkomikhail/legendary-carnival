import React, { ReactElement } from "react";
import './newCategoryModal.scss';

const  newCategoryModal = (
  cancelHandler: () => void, 
  createlHandler: () => void,
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  ): ReactElement => {

  return (
    <div className="category-modal">
      <div className="category-modal__window">
        <h3 className="category-modal__window-heading">Add new category</h3>
        <label htmlFor="categoryName">
          Name:
          <input 
            type="text" 
            id="categoryName"
            onChange={changeHandler}
          />
        </label>
        <div className="category-modal__button-wrap">
          <button
          className="category-modal__cancel-button"
          onClick={cancelHandler}
          type="button">
             Cancel
          </button>
          <button
          className="category-modal__create-button"
          type="button"
          onClick={createlHandler}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default newCategoryModal;