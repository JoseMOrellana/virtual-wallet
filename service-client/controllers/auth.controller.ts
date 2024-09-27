import express, { Request, Response } from 'express';
import { HttpCodes } from '../constants';
import { getUserByEmail } from '../../service-db/models/user.model';
import { random, authentication, validateEmail } from '../helpers';
import BadRequestError from '../errors/BadRequestError';
import api from '../api/serviceDb';

// @desc      Register User
// @route     POST /auth/register
// @access    Public
const register = async (req: Request, res: Response) => {
    const { email, password, document, name, phone } = req.body;

    if (!email || !password || !document || !name || !phone) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: 'Missing or empty required fields in request body!' });
    }

    if (!validateEmail(email)) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: 'Not a valid email!' });
    }

    const response = await api.post('/auth/register', req.body);

    return res.status(response.status).json(response.data);
};

// @desc      Login User
// @route     POST /auth/login
// @access    Public
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError({ code: HttpCodes.BAD_REQUEST, message: 'Missing or empty required fields in request body!' });
    }

    const response = await api.post('/auth/login', req.body);

    const cookie = response.headers['set-cookie'] ? response.headers['set-cookie'][0] : '';
    console.log({ cookie });
    return res
        .status(response.status)
        .header({ ['Set-Cookie']: cookie })
        .json(response.data);
};

export { register, login };
