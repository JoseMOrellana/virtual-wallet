import express, { Request, Response } from 'express';
import { HttpCodes } from '../constants';
import { getUserByEmail, getUserByDocument, createUser } from '../models/user.model';
import { random, authentication } from '../helpers';
import BadRequestError from '../errors/BadRequestError';
import { createWallet } from '../models/wallet.model';

// @desc      Register User
// @route     POST /auth/register
// @access    Public
const register = async (req: Request, res: Response) => {
    const { email, password, document, name, phone } = req.body;

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: 'User already exists!' });
    }

    const existingDocument = await getUserByDocument(document);
    if (existingDocument) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: 'User already exists!' });
    }

    const salt = random();
    const user = await createUser({
        document,
        email,
        name,
        phone,
        authentication: {
            salt,
            password: authentication(salt, password),
        },
    });

    await createWallet({ user: user._id, balance: 0 });

    return res.status(HttpCodes.CREATED).json({ success: true, data: user }).end();
};

// @desc      Login User
// @route     POST /auth/login
// @access    Public
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
        throw new BadRequestError({ code: HttpCodes.FORBIDDEN, message: 'Invalid username or password!' });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
        throw new BadRequestError({ code: HttpCodes.FORBIDDEN, message: 'Invalid username or password!' });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(HttpCodes.OK).json({ success: true, data: user }).end();
};

export { register, login };
