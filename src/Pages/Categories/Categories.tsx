import React, { useState, useEffect }  from 'react';
import CategoryCard from './CategoryCard/CategoryCard';
import { cardSets, categoryData } from '../../assets/cards';
import './categories.scss';
import { Link } from "react-router-dom";

const Categories = () => {
  
  useEffect(() => {
    getData();
  }, []);

  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState([]);

  const getData = () => {
    const namesData = categoryData;
    const cardsData = cardSets;
    setCategories(namesData);
    setItem(cardsData);
  }

  const categoryComponents = categories.map(({name, id}, idx) => {
    const imageSrc = item[idx].items[0].image;
    return (
      <Link to={'/' + id} className="category" key={categoryData[idx].id} >
        <CategoryCard name={name} image={imageSrc} />
      </Link>
    )
  })

  return (
    <div className="categories">        
      {categoryComponents}
    </div>
  )
}

export default Categories;