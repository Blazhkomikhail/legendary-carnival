import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { categoryData } from '../../assets/cards';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './sideMenu.scss';

const SideMenu = () => {
  useEffect(() => {
    getData();
  }, []);

  const [categories, setCategories] = useState([]);

  const getData = () => {
    const categoriesNameData = categoryData;
    setCategories(categoriesNameData);
  }

  const categoryComponents = categories.map(({name, id}, idx) => {
    return (
      <Link to={'/' + id} replace className="category" key={categoryData[idx].id}>
        { name }
      </Link>
    )
  })

  return (
      <Menu>
        {categoryComponents}
      </Menu>
  )
}

export default SideMenu;