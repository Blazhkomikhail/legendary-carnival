import express from 'express';
import CategoryService from '../services/category.service';

class CategoryController {
  async create (req: express.Request, res: express.Response) {
    try {
      const createdCategory = await CategoryService.create(req.body);
      res.json(createdCategory);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong. Try again later."});
    }
  }

  async getAll (req: express.Request, res: express.Response) {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong. Try again later."});
    }
  }

  async getOne (req: express.Request, res: express.Response) {
    try {
      const category = await CategoryService.getOne(req.params.id);
      res.json(category);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong. Try again later."});
    }
  }

  async update(req: express.Request, res: express.Response) {
    try {
      const updated = await CategoryService.update(req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const deleted = await CategoryService.delete(req.params.id);
      return res.json(deleted);
    } catch (err) {
        return res.status(500).json(err.message);
    }
  }
}

export default new CategoryController();