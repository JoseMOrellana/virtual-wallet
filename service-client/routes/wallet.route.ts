import { Router } from 'express';
import { getWallet } from '../controllers/wallet.controller';

const walletRouter = (): Router => {
    const router = Router();

    router.get('/', getWallet);

    return router;
};

export { walletRouter };
