import Card from '../models/card';
import Category from '../models/category';
import User from '../models/auth';
import { cards, categories } from './init.data';

const uploadInitCards = async () => {
  await Card.insertMany(cards);
}

const uploadInitCategories = async () => {
  await Category.insertMany(categories);
}

const upLoadInitDBData = async () => {
  await uploadInitCards();
  uploadInitCategories();
}

export default upLoadInitDBData;