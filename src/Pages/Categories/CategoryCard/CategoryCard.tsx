import React, { ReactElement } from 'react';

type MyProps = {
  name: string;
  image: string;
  cardsNum: number;
};

const CategoryCard = (props: MyProps): ReactElement => {
  const { image, name, cardsNum } = props;
  return (
    <div className="category-card-wrap">
      <div className="category-card">
        <div
          className="category-card__imgage-wrap"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="category-card__info">
          <div className="category-card__name">{name}</div>
          <span className="category-card__number">Includes: {cardsNum} cards</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
