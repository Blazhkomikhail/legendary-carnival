import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  updateCards, 
  updateCategory, 
  deleteCardsByCategoryName, 
  deleteCategory 
} from '../../../api/api';
import './adminCategoryCard.scss';

type MyProps = {
  name: string;
  length: number;
  id: string;
};

const AdminCategoryCard = (props: MyProps): ReactElement => {
  const { name, length, id } = props;
  const [isRedacting, setIsRedacting] = useState(false);
  const [categoryName, setCategoryName] = useState(name);
  const [isDeleted, setIsDeleted] = useState(false);

  const redactHandler = () => {
    setIsRedacting(true)
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  }

  const submitNameHandler = async () => {
    if (categoryName === name) {
      setIsRedacting(false);
      return;
    }

    const category = {
      _id: id,
      name: categoryName,
    }

    await updateCards(name, categoryName);
    await updateCategory(category);
    setIsRedacting(false);
  }

  const removeHandler = async () => {
    const body = { categoryName: categoryName };
    setIsDeleted(true);
    await deleteCategory(id);
    await deleteCardsByCategoryName(body);
  }

  const nameComponent = () => {
    if(!isRedacting) {
      return (
        <div className="admin__name-wrap">
          <div className="admin__category-card-name">Category: {categoryName}</div>
          <div 
            role="presentation"
            className="admin__redact-icon" 
            onClick={redactHandler}
            style={{ backgroundImage: `url('icons/edit-icon.png')` }}
          />
        </div>
      )
    } else {
      return (
        <>
          <div className="admin__category-card-name">Category: </div>
          <input 
            type="text"
            value={categoryName}
            onChange={event => changeHandler(event)}
          />
          <button 
            type="button"
            onClick={submitNameHandler}
          >Ok
          </button>
        </>
      )
    }
  }

  return (
    <div className={
      `admin__category-card-wrap${isDeleted ? 
        ' admin__category-card-wrap_deleted' : ''}`
      }>
      <div className="admin__category-card">
        {nameComponent()}
        <span className="admin__category-card-length">Includes: {length} words</span>
        <div className="admin__category-btns-wrap">
          <div 
            role="presentation"
            className="admin__remove-icon" 
            onClick={removeHandler}
            style={{ backgroundImage: `url('icons/delete-icon.jpg')` }}
          />
          <Link 
            to={`admin/${categoryName}`} 
            className="admin__category-cards-button" 
            key={id}
          >
            <button className="admin__cards-button" >Cards</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryCard;

