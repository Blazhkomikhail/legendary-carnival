import { Router } from 'express';
import CardController from '../controllers/card.controller';
const upload = require('../utils/multer');

const cardRouter = Router();

cardRouter.post('/card', upload.single('picture'), CardController.create);
cardRouter.get('/card', CardController.getAll);
cardRouter.get('/card/:id', CardController.getOne);
cardRouter.put('/card/', upload.single('picture'), CardController.update);
cardRouter.delete('/card/:id', CardController.delete);
cardRouter.delete('/card/', CardController.deleteMany);

export default cardRouter;