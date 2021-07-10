import React, { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import AdminCategoryCard from './AdminCategoryCard/AdminCategoryCard';
import { getCategories } from '../../api/api';
// import './categories.scss';

const Admin = (): ReactElement => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response);
      })
  }, []);

  const categoryComponents = categories.map(({ name, _id }) => {
    return (
      <Link to={`admin/${name}`} className="category" key={_id}>
        <AdminCategoryCard name={name} />
      </Link>
    );
  });
  return <div className="categories">{categoryComponents}</div>;
};

export default Admin;
