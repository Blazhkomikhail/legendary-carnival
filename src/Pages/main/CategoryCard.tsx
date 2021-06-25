import React  from "react";

type MyProps = {
  name: string;
  image: string;
};

const CategoryCard = (props: MyProps) => {
    const { image, name } = props;
    return (
      <div className="category-card">
        <img src = { image } className="category-card__image" alt=""/> 
        <div className="category-card__name">{ name }</div> 
      </div>
    )
};

export default CategoryCard;