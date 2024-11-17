import { Router } from "express";
import * as pingControler from '../controllers/ping';
import * as authControler from '../controllers/auth';

export const mainRouter = Router();

mainRouter.get('/ping', pingControler.ping);

mainRouter.post('/auth/signin', authControler.signin);
mainRouter.post('/auth/signup', authControler.signup);  