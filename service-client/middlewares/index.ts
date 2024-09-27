import { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';

import { HttpCodes } from '../constants';
import { CustomError } from '../errors/CustomError';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const sessionToken = req.cookies ? req.cookies['AUTH'] : null;
    merge(req, { apiCookie: sessionToken });

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

export { isAuthenticated, errorHandler };
