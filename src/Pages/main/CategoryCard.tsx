import React  from "react";

type MyProps = {
  name: string;
  image: string;
};

export default class CategoryCard extends React.Component<MyProps> {
  render() {
    return (
      <div className="category-card">
        <img src={this.props.image} className="category-card__image"></img> 
        <div className="category-card__name">{this.props.name}</div> 
      </div>
    )
  }
}