import { Request, Response } from 'express';
import { HttpCodes, ResponseMessages } from '../constants';
import { UserDocument } from '../../service-db/models/user.model';
import { WalletDocument } from '../../service-db/models/wallet.model';
import BadRequestError from '../errors/BadRequestError';
import { createTransaction, getTransactionByTokens, TransactionStatus, TransactionTypes } from '../../service-db/models/transaction.model';
import { generateRandomCode, sendEmail } from '../helpers';
import { get } from 'lodash';
import api from '../api/serviceDb';

// @desc      Create a transaction of type DEPOSIT
// @route     POST /transaction/deposit
// @access    Private
const createDeposit = async (req: Request, res: Response) => {
    const { amount } = req.body;

    if (amount === undefined) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.MISSING_FIELDS });
    }

    if (amount <= 0) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.GREATER_THAN_ZERO });
    }

    const cookie = get(req, 'apiCookie') as unknown as string;

    const response = await api.post('/transaction/deposit', req.body, { headers: { Cookie: `AUTH=${cookie}` } });

    return res.status(response.status).json(response.data);
};

// @desc      Create a transaction of type PAYMENT
// @route     POST /transaction/payment
// @access    Private
const createPayment = async (req: Request, res: Response) => {
    const { amount } = req.body;

    if (amount === undefined) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.MISSING_FIELDS });
    }

    if (amount <= 0) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.GREATER_THAN_ZERO });
    }

    const cookie = get(req, 'apiCookie') as unknown as string;

    const response = await api.post('/transaction/payment', req.body, { headers: { Cookie: `AUTH=${cookie}` } });

    return res.status(response.status).json(response.data);
};

// @desc      Validates a transaction
// @route     POST /transaction/validate
// @access    Private
const validatePayment = async (req: Request, res: Response) => {
    const { paymentToken, sessionToken } = req.body;

    if (!paymentToken || !sessionToken) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.MISSING_FIELDS });
    }

    const cookie = get(req, 'apiCookie') as unknown as string;

    const response = await api.post('/transaction/validate', req.body, { headers: { Cookie: `AUTH=${cookie}` } });

    return res.status(response.status).json(response.data);
};

export { createDeposit, createPayment, validatePayment };
