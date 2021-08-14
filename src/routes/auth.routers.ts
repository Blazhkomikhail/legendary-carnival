import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.get('/login/:id', AuthController.getUserById);

export default authRouter;