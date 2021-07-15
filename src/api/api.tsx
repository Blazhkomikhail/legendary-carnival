export const baseUrl = 'https://supermarche-livre-09213.herokuapp.com';
const category = `${baseUrl}/api/category`;
const card = `${baseUrl}/api/card`;
const auth = `${baseUrl}/auth/login`;

interface ICreateCategoryBody {
  name: string;
}

type Category = {
  _id: string;
  name: string;
};

export interface ICard {
  _id: string;
  categoryName: string;
  word: string;
  translation: string;
  picture: string;
  audioSrc: string;
}

export const createCategory = async (
  body: ICreateCategoryBody
): Promise<Category> => {
  const response = await fetch(category, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const createdCategory = response.json();
  return createdCategory;
};

export const getCategories = async (): Promise<Array<Category>> => {
  const response = await fetch(category);
  const categories = await response.json();
  return categories;
};

export const updateCategory = async (body: Category): Promise<Category> => {
  const response = await fetch(category, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updated = await response.json();
  return updated;
};

export const deleteCategory = async (id: string): Promise<Category> => {
  const response = await fetch(`${category}/${id}`, {
    method: 'DELETE',
  });
  const deleted = await response.json();
  return deleted;
};

export const getCardsByCategoryName = async (
  categoryName: string
): Promise<Array<ICard>> => {
  const response = await fetch(`${card}/?name=${categoryName}`);
  const categories = await response.json();
  return categories;
};

export const getAllCards = async (): Promise<Array<ICard>> => {
  const response = await fetch(card);
  const cards = await response.json();
  return cards;
};

export const createCard = async (data: FormData): Promise<ICard> => {
  const response = await fetch(card, {
    method: 'POST',
    body: data,
  });
  const created = await response.json();
  return created;
};

export const udateCard = async (data: FormData): Promise<ICard> => {
  const response = await fetch(card, {
    method: 'PUT',
    body: data,
  });
  const updated = await response.json();
  return updated;
};

export const updateCards = async (
  oldCategoryName: string,
  newCategoryName: string
): Promise<Array<ICard>> => {
  const body = {
    filter: { categoryName: oldCategoryName },
    update: { categoryName: newCategoryName },
  };
  const response = await fetch(card, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updatedCards = await response.json();
  return updatedCards;
};

interface IDeleteCardsBody {
  categoryName: string;
}

export const deleteCardsByCategoryName = async (
  body: IDeleteCardsBody
): Promise<ICard> => {
  const response = await fetch(card, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const deleted = await response.json();
  return deleted;
};

export const deleteCardById = async (id: string): Promise<ICard> => {
  const response = await fetch(`${card}/${id}`, { method: 'DELETE' });
  const deleted = await response.json();
  return deleted;
};

type LoginBody = {
  username: string;
  password: string;
};

type User = {
  token: string;
  user: {
    id: string;
    name: string;
  };
};

export const login = async (body: LoginBody): Promise<User> => {
  const response = await fetch(auth, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const user = await response.json();
  return user;
};

export const checkUser = async (): Promise<{ id: string; name: string }> => {
  const userId = JSON.parse(localStorage.getItem('loginData')).user.id;
  const response = await fetch(`${auth}/${userId}`);
  const user = response.json();
  return user;
};
