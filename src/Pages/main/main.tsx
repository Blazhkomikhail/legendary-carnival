import React, { useState, useEffect }  from 'react';
import CategoryCard from './CategoryCard';
import { cardSets, categoryData } from '../../assets/cards';
import './Main.scss';
import { Link } from "react-router-dom";

const Main = () => {
  
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
      <div className="main">
        <div className="main__buttons">
          <div className="main__categories-wrap">        
            {categoryComponents}       
          </div>
        </div>
      </div>
  )
}

export default Main;