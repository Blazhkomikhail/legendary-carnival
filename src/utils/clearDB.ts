import Card from '../models/card';
import Category from '../models/category';

const clearCategoryCollection= async () => {
  try {
    await Card.deleteMany({});
  } catch (err) {
    console.log(err);
  }
}

const clearCardCollection = async () => {
  try {
    await Category.deleteMany({});
  } catch (err) {
    console.log(err);
  }
}

const clearDBCollections = async () => {
  await clearCardCollection();
  clearCategoryCollection();
}

export default clearDBCollections;

