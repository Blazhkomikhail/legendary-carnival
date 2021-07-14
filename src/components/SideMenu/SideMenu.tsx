import React, { useState, useEffect, ReactElement } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { categoryData } from '../../assets/cards';
import './sideMenu.scss';

const SideMenu = (): ReactElement => {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const getData = () => {
    const categoriesNameData = categoryData;
    setCategories(categoriesNameData);
  };

  useEffect(() => {
    getData();
  }, []);

  const categoryComponents = categories.map(({ name }, idx) => {
    return (
      <Link
        to={`/${name}`}
        onClick={() => setMenuOpen(!menuOpen)}
        className="side-menu__category"
        key={categoryData[idx].id}
      >
        {name}
      </Link>
    );
  });

  return (
    <Menu isOpen={menuOpen}>
      <Link
        to="/"
        onClick={() => setMenuOpen(!menuOpen)}
        className="side-menu__category side-menu__category_main"
        key={123}
      >
        Main Page
      </Link>
      {categoryComponents}
      <Link
        to="/statistic"
        onClick={() => setMenuOpen(!menuOpen)}
        className="side-menu__category side-menu__category_statistic"
      >
        Statistic
      </Link>
    </Menu>
  );
};

export default SideMenu;
