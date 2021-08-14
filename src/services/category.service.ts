import Category from '../models/category';

interface IGettedCategory {
  _id: String,
  name: String
}

class CategoryService {

  async create (body: typeof Category) {
      const createdCategory = await Category.create(body);
      return createdCategory;
  }

  async getAll () {
      const categories = await Category.find();
      return categories;
  }

  async getOne (id: String) {
    if(!id) {
      throw new Error('It has no ID');
    }
    const category = await Category.findById(id);
    return category;
  }

  async update(body: IGettedCategory) {
      if (!body._id) {
        throw new Error('It has no ID');
      }
      const updated = await Category.findByIdAndUpdate(body._id, body, {new: true});
      return updated;
  }

  async delete(id: String) {
    if (!id) {
      throw new Error('Id is required');
    }
    const deleted = await Category.findByIdAndDelete(id);
    return deleted;
  }
}

export default new CategoryService();