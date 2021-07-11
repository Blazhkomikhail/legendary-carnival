import React, { useState, useEffect, ReactElement } from 'react';
import AdminCategoryCard from './AdminCategoryCard/AdminCategoryCard';
import { getCategories, getCardsByCategoryName } from '../../api/api';
// import './categories.scss';

interface GettedCategory {
  _id: number;
  name: string;
}

const Admin = (): ReactElement => {
  const [categories, setCategories] = useState([]);

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

  const categoryComponents = categories.map(({ name, _id, length }) => {
    return (
      <AdminCategoryCard name={name} length={length} id={_id} key={_id} />
    );
  });
  return <div className="categories">{categoryComponents}</div>;
};

export default Admin;
