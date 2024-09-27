import { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/user.model';
import { HttpCodes, ResponseMessages } from '../constants';
import { CustomError } from '../errors/CustomError';
import BadRequestError from '../errors/BadRequestError';
import { getWalletByUser } from '../models/wallet.model';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const sessionToken = req.cookies ? req.cookies['AUTH'] : null;
    if (!sessionToken) {
        throw new BadRequestError({ code: HttpCodes.FORBIDDEN, message: ResponseMessages.UNAUTHORIZED });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
        throw new BadRequestError({ code: HttpCodes.FORBIDDEN, message: ResponseMessages.UNAUTHORIZED });
    }

    merge(req, { identity: existingUser });

    return next();
};

const fetchWallet = async (req: Request, res: Response, next: NextFunction) => {
    const currentUserId = get(req, 'identity._id') as unknown as string;

    if (!currentUserId) {
        throw new BadRequestError({ code: HttpCodes.FORBIDDEN, message: ResponseMessages.USER_NOT_FETCHED });
    }
    const wallet = await getWalletByUser(currentUserId);

    if (!wallet) {
        throw new BadRequestError({ code: HttpCodes.FORBIDDEN, message: ResponseMessages.WALLET_NOT_FETCHED });
    }

    merge(req, { wallet });

    return next();
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Handled errors
    if (err instanceof CustomError) {
        const { statusCode, errors, logging } = err;
        if (logging) {
            console.error(
                JSON.stringify(
                    {
                        code: err.statusCode,
                        errors: err.errors,
                        stack: err.stack,
                    },
                    null,
                    2,
                ),
            );
        }

        return res.status(statusCode).send({ success: false, errors });
    }

    // Unhandled errors
    console.error(JSON.stringify(err, null, 2));
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({ success: false, errors: [{ message: `Something went wrong: ${err.message}` }] });
};

export { isAuthenticated, errorHandler, fetchWallet };
