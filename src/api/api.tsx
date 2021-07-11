const baseUrl = 'http://127.0.0.1:3000';
const category = `${baseUrl}/api/category`;
const card = `${baseUrl}/api/card`;

export const getCategories = async () => {
  const response = await fetch(category);
  const categories = await response.json();
  return categories;
}

export const getCardsByCategoryName = async (categoryName: String) => {
  const response = await fetch(`${card}/?name=${categoryName}`);
  const categories = await response.json();
  return categories;
}

interface ICategory {
  _id: string,
  name: string,
}

export const updateCategory = async (body: ICategory) => {
  const response = await fetch(category, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updated = await response.json();
  return updated;
}

export const deleteCategory = async (id: string) => {
  console.log(`${category}/${id}`);
  const response = await fetch(`${category}/${id}`, {
    method: 'DELETE'
  });
  const deleted = await response.json();
  return deleted;
}


export const updateCards = async (oldCategoryName: string, newCategoryName: string) => {
  const body = {
    filter: { categoryName : oldCategoryName },
    update: { categoryName : newCategoryName },
  }
  const response = await fetch(card, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updatedCards = await response.json();
  return updatedCards;
}

interface IDeleteCardsBody {
  categoryName: string;
}

export const deleteCardsByCategoryName = async (body: IDeleteCardsBody) => {
  const response = await fetch(card, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const deleted = await response.json();
  return deleted;
}