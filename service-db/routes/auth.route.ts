import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const authRouter = (): Router => {
    const router = Router();

    router.post('/register', register);

    router.post('/login', login);

    return router;
};

export { authRouter };
