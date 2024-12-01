import { Router } from "express";
import * as pingControler from '../controllers/ping';
import * as authControler from '../controllers/auth';
import * as privateController from '../controllers/private';
import { verifyJWT } from "../libs/jwt";

export const mainRouter = Router();

mainRouter.get('/ping', pingControler.ping);

mainRouter.post('/auth/signin', authControler.signin);
mainRouter.post('/auth/signup', authControler.signup);

mainRouter.post('/auth/useotp', authControler.useOTP);

mainRouter.get('/private', verifyJWT, privateController.test);