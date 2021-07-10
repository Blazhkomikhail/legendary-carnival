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