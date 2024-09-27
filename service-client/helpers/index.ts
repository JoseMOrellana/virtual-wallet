import crypto from 'crypto';
import nodemailer, { SendMailOptions } from 'nodemailer';

const SECRET = process.env.SECRET || 'SECRET_FALLBACK';

const random = () => crypto.randomBytes(128).toString('base64');
const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};

const sendEmail = (mailOptions: SendMailOptions) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'Gmail',
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '465'),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER || '',
            pass: process.env.EMAIL_PASSWORD || '',
        },
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
            console.log(`Email content: ${mailOptions.text}`);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
};

const generateRandomCode = (length: number = 6): String => {
    return Math.random().toString(20).substring(0, length);
};

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export { random, authentication, sendEmail, generateRandomCode, validateEmail };
