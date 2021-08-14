import express from "express";
import { Router } from "express";
import CategoryController from '../controllers/category.controller';
const categoryRouter = Router();


categoryRouter.post('/category', CategoryController.create);
categoryRouter.get('/category', CategoryController.getAll);
categoryRouter.get('/category/:id', CategoryController.getOne);
categoryRouter.put('/category', CategoryController.update);
categoryRouter.delete('/category/:id', CategoryController.delete);

export default categoryRouter;