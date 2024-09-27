import express, { Request, Response } from 'express';
import { HttpCodes, ResponseMessages } from '../constants';
import { getUserByPersonalData } from '../../service-db/models/user.model';
import { WalletDocument } from '../../service-db/models/wallet.model';
import { get } from 'lodash';
import BadRequestError from '../errors/BadRequestError';
import { getTransactionsByWallet } from '../../service-db/models/transaction.model';
import api from '../api/serviceDb';

// @desc      Validates a transaction
// @route     GET /wallet?document=&phone=
// @access    Private
const getWallet = async (req: Request, res: Response) => {
    const document = req.query['document'] as string;
    const phone = req.query['phone'] as string;

    if (!document || !phone) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.MISSING_FIELDS });
    }

    const cookie = get(req, 'apiCookie') as unknown as string;
    console.log({ cookie });
    const response = await api.get(`/wallet?document=${document}&phone=${phone}`, { headers: { Cookie: `AUTH=${cookie}` } });

    return res.status(response.status).json(response.data);
};

export { getWallet };
