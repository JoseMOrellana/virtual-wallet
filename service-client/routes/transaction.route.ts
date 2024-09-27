import { Router } from 'express';
import { createDeposit, createPayment, validatePayment } from '../controllers/transaction.controller';

const transactionRouter = (): Router => {
    const router = Router();

    router.post('/deposit', createDeposit);

    router.post('/payment', createPayment);

    router.post('/validate', validatePayment);

    return router;
};

export { transactionRouter };
