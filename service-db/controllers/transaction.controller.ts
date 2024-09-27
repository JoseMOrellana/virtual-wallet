import { Request, Response } from 'express';
import { HttpCodes, ResponseMessages } from '../constants';
import { UserDocument } from '../models/user.model';
import { WalletDocument } from '../models/wallet.model';
import BadRequestError from '../errors/BadRequestError';
import { createTransaction, getTransactionByTokens, TransactionStatus, TransactionTypes } from '../models/transaction.model';
import { generateRandomCode, sendEmail } from '../helpers';
import { get } from 'lodash';

// @desc      Create a transaction of type DEPOSIT
// @route     POST /transaction/deposit
// @access    Private
const createDeposit = async (req: Request, res: Response) => {
    const { amount } = req.body;

    const wallet = get(req, 'wallet') as unknown as WalletDocument;

    const transaction = await createTransaction({
        wallet: wallet!._id,
        type: TransactionTypes.DEPOSIT,
        amount,
        status: TransactionStatus.DONE,
    });

    wallet.balance = wallet.balance + amount;

    await wallet!.save();

    return res.status(HttpCodes.CREATED).json({ success: true, data: transaction }).end();
};

// @desc      Create a transaction of type PAYMENT
// @route     POST /transaction/payment
// @access    Private
const createPayment = async (req: Request, res: Response) => {
    const { amount } = req.body;

    const wallet = get(req, 'wallet') as unknown as WalletDocument;

    if (wallet.balance < amount) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.PAYMENT_AMOUNT_GREATER });
    }

    const sessionToken = req.cookies['AUTH'];
    const user = get(req, 'identity') as unknown as UserDocument;
    const paymentToken = generateRandomCode();

    const transaction = await createTransaction({
        wallet: wallet._id,
        type: TransactionTypes.PAYMENT,
        amount,
        status: TransactionStatus.PENDING,
        sessionToken,
        paymentToken,
    });

    const mailOptions = {
        from: 'jose.mom.1304@gmail.com',
        to: user.email,
        subject: 'Payment Token',
        text: `This is your payment token: ${paymentToken}`,
    };

    sendEmail(mailOptions);

    return res.status(HttpCodes.CREATED).json({ success: true, data: transaction }).end();
};

// @desc      Validates a transaction
// @route     POST /transaction/validate
// @access    Private
const validatePayment = async (req: Request, res: Response) => {
    const { paymentToken, sessionToken } = req.body;

    const transaction = await getTransactionByTokens(paymentToken, sessionToken).select('+paymentToken +sessionToken');

    if (!transaction) {
        throw new BadRequestError({ code: HttpCodes.NOT_FOUND, message: ResponseMessages.TRANSACTION_NOT_FOUND });
    }

    if (transaction.status !== TransactionStatus.PENDING) {
        throw new BadRequestError({ code: HttpCodes.NOT_FOUND, message: ResponseMessages.TRANSACTION_NOT_PENDING });
    }

    const wallet = get(req, 'wallet') as unknown as WalletDocument;

    const amount = Number(transaction.amount);
    if (wallet.balance < amount) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: ResponseMessages.PAYMENT_AMOUNT_GREATER });
    }

    transaction.status = TransactionStatus.DONE;
    await transaction.save();

    wallet.balance = wallet.balance - amount;
    await wallet.save();

    return res.status(HttpCodes.OK).json({ success: true, data: transaction }).end();
};

export { createDeposit, createPayment, validatePayment };
