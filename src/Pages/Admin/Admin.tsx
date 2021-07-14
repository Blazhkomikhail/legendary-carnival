import React, { useState, useEffect, ReactElement } from 'react';
import { useHistory } from 'react-router';
import AdminCategoryCard from './AdminCategoryCard/AdminCategoryCard';
import { getCategories, getCardsByCategoryName, checkUser } from '../../api/api';
import NewCategoryModal from './NewCategoryModal/NewCategoryModal';
import NewCardModal from './NewCardModal/NewCardModal';
import './admin.scss';

interface GettedCategory {
  _id: number;
  name: string;
}

const Admin = (): ReactElement => {
  const [categories, setCategories] = useState([]);
  const [isCategotyModalShowed, setCategoryModalShowed] = useState(false);
  const [isCardModalShowed, setIsCardModalShowed] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const history = useHistory();

  if (!localStorage.getItem('loginData')) {
    history.push('/auth');
  } else {
    const userId = JSON.parse(localStorage.getItem('loginData')).user.id;

    checkUser().then(response => {
      if (response.id !== userId) {
        history.push('/auth');
      }
    })
  }

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

  const addNewCategoryHandler = () => {
    setCategoryModalShowed(true);
  }

  const categoryComponents = categories.map(({ name, _id, length }) => {
    return (
      <AdminCategoryCard 
        name={name} 
        length={length} 
        id={_id} 
        key={_id} 
        cardModalHandler={setIsCardModalShowed}
        shareCategoryName={setCurrentCategory}
      />
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
      { isCategotyModalShowed ? 
          <NewCategoryModal 
            cancelHandler={() => setCategoryModalShowed(false)} 
          />
          : null
      }
      { isCardModalShowed ? 
          <NewCardModal 
            categoryName={currentCategory} 
            cancelHandler={() => setIsCardModalShowed(false)}
          />
          : null
      }
    </div>
  )
};

export default Admin;
