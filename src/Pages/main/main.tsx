import React, { ReactElement }  from 'react';
import CategoryCard from './CategoryCard';
import { cards, categoryNames } from '../../assets/cards';

export default class Main extends React.Component {

  categories: Array<ReactElement>;

  constructor(props: string) {
    super(props);
    const names = categoryNames;
    const cardsData = cards;
    this.categories = names.map((name, idx) => {
      const imageSrc = cardsData[idx][0].image;
      return (
        <div className="category" key={idx} >
          <CategoryCard name={name} image={imageSrc} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="main">
        <div className="main__buttons">
          <div className="main__categories-wrap">
            {this.categories}
          </div>
        </div>
      </div>
    )
  }
}