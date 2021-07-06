import React, { ReactElement } from 'react';

type MyProps = {
  name: string;
  image: string;
};

const CategoryCard = (props: MyProps): ReactElement => {
  const { image, name } = props;
  return (
    <div className="category-card-wrap">
      <div className="category-card">
        <div
          className="category-card__imgage-wrap"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="category-card__name">{name}</div>
      </div>
    </div>
  );
};

export default CategoryCard;
