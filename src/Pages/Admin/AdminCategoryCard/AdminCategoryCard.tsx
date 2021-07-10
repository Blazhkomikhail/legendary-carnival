import React, { ReactElement } from 'react';

type MyProps = {
  name: string;
};

const AdminCategoryCard = (props: MyProps): ReactElement => {
  const { name } = props;
  return (
    <div className="category-card-wrap">
      <div className="category-card">
        <div className="category-card__name">{name}</div>
      </div>
    </div>
  );
};

export default AdminCategoryCard;
