import React, { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard/CategoryCard';
import { createStorageData } from '../Statistic/Statistic';
import { getAllCards, getCategories } from '../../api/api';
import './categories.scss';

const Categories = (): ReactElement => {
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);

  if (!localStorage.getItem('statistic')) {
    createStorageData();
  }

  useEffect(() => {
    getAllCards()
      .then((response) => {
        setCards(response);
      })
      .then(() => {
        getCategories().then((response) => {
          setCategories(response);
        });
      });
  }, []);

  const categoryComponents = categories.map(({ name }, idx) => {
    const categoryCards = cards.filter((card) => card.categoryName === name);
    const { picture } = categoryCards[0];
    const cardsCount = categoryCards.length;

    return (
      <Link to={`/${name}`} className="category" key={categories[idx]._id}>
        <CategoryCard
          name={name}
          cardsNum={cardsCount}
          image={`${picture || 'img/no-img.png'}`}
        />
      </Link>
    );
  });

  return <div className="categories">{categoryComponents}</div>;
};

export default Categories;
