import React, { useState, useEffect, ReactElement } from 'react';
import AdminCategoryCard from './AdminCategoryCard/AdminCategoryCard';
import { getCategories, getCardsByCategoryName, createCategory } from '../../api/api';
import newCategoryModal from './NewCategoryModal/newCategoryModal';
import './admin.scss';

interface GettedCategory {
  _id: number;
  name: string;
}

const Admin = (): ReactElement => {
  const [categories, setCategories] = useState([]);
  const [isModalSgowed, setIsModalSgowed] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    getCategories()
      .then((response) => {
        const updated = response.map( async(category: GettedCategory) => {
          const { name } = category;
          const categoryLength = await getCardsByCategoryName(name);
          const newCategory = Object.assign(category, {'length':  categoryLength.length});
          return newCategory;
        })
        return Promise.all(updated)
      }).then((updated) => {
        setCategories(updated);
      })
  }, []);

  const cancelModalHandler = () => {
    setIsModalSgowed(false);
  }

  const addNewCategoryHandler = () => {
    setIsModalSgowed(true);
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  }

  const submitModalHandler = async () => {
    if (!newCategoryName) return;

    const body = { name: newCategoryName };
    await createCategory(body);
    cancelModalHandler();
    window.location.reload();
  }

  const categoryComponents = categories.map(({ name, _id, length }) => {
    return (
      <AdminCategoryCard name={name} length={length} id={_id} key={_id} />
    );
  });


  return (
    <div className="categories">
      {categoryComponents}
      <button  
        className="admin__add-new-button" 
        type="button"
        onClick={addNewCategoryHandler}
      >
        Add new category
      </button>
      {isModalSgowed ? newCategoryModal(cancelModalHandler, submitModalHandler, changeHandler) : null}
    </div>
  )
};

export default Admin;
