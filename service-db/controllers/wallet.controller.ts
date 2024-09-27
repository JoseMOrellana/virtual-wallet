import express, { Request, Response } from 'express';
import { HttpCodes, ResponseMessages } from '../constants';
import { getUserByPersonalData } from '../models/user.model';
import { WalletDocument } from '../models/wallet.model';
import { get } from 'lodash';
import BadRequestError from '../errors/BadRequestError';
import { getTransactionsByWallet } from '../models/transaction.model';

// @desc      Validates a transaction
// @route     GET /wallet?document=&phone=
// @access    Private
const getWallet = async (req: Request, res: Response) => {
    const document = req.query['document'] as string;
    const phone = req.query['phone'] as string;

    if (!document || !phone) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.MISSING_FIELDS });
    }

    const user = await getUserByPersonalData(document, phone);

    if (!user) {
        throw new BadRequestError({ code: HttpCodes.NOT_FOUND, message: ResponseMessages.INCORRECT_DATA });
    }

    const userIdentityId = get(req, 'identity._id') as unknown as string;

    if (user._id.toString() !== userIdentityId.toString()) {
        throw new BadRequestError({ code: HttpCodes.NOT_FOUND, message: ResponseMessages.INCORRECT_DATA });
    }

    const wallet = get(req, 'wallet') as unknown as WalletDocument;
    const walletId = wallet._id as string;

    const transactions = await getTransactionsByWallet(walletId);

    return res.status(HttpCodes.OK).json({ success: true, data: { wallet, transactions } }).end();
};

export { getWallet };
