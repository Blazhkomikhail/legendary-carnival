import React, { ReactElement, useState } from "react";
import { createCategory } from '../../../api/api';
import './newCategoryModal.scss';

type CategoryModalProps = {
  cancelHandler: () => void
}

const  NewCategoryModal = (props: CategoryModalProps): ReactElement => {
  const {cancelHandler} = props;
  const [newCategoryName, setNewCategoryName] = useState('');  

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  }

  const submitHandler = async () => {
    if (!newCategoryName) return;

    const body = { name: newCategoryName };
    await createCategory(body);
    cancelHandler();
    console.log('Success message');
  }

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
          onClick={submitHandler}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewCategoryModal;