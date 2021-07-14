import React, { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard/CategoryCard';
import { getAllCards, getAllCategories } from '../../api/api';
import './categories.scss';

const baseUrl = 'http://127.0.0.1:3000/';

const Categories = (): ReactElement => {
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {

    getAllCards()
      .then(cards => {
        setCards(cards);
      }).then(() => {
          getAllCategories()
            .then(categories => {
              setCategories(categories);
            })
        })
  }, []);

  const categoryComponents = categories.map(({ name }, idx) => {
    
    const categoryCards = cards.filter(card => card.categoryName === name);
    const picture = categoryCards[0].picture;
    const cardsCount = categoryCards.length;
    
    return (
      <Link to={`/${name}`} className="category" key={categories[idx]._id}>
        <CategoryCard name={name} cardsNum={cardsCount} image={`${baseUrl}${picture || 'no-img.png'}`} />
      </Link>
    );
  });

  return <div className="categories">{categoryComponents}</div>;
};

export default Categories;
