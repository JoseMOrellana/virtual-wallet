import express from 'express';
import { connectToDatabase } from './db-connection';
import { authRouter } from './routes/auth.route';
import { errorHandler, fetchWallet, isAuthenticated } from './middlewares';
import 'express-async-errors';
import { walletRouter } from './routes/wallet.route';
import cookieParser from 'cookie-parser';
import { transactionRouter } from './routes/transaction.route';
import cors from 'cors';

const PORT = parseInt(process.env.PORT || '3000');

const CONSUMER_HOST = process.env.CONSUMER_HOST || '';
const CONSUMER_PORT = parseInt(process.env.CONSUMER_PORT || '5173');

const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = parseInt(process.env.DB_PORT || '27017');
const DB_NAME = process.env.DB_NAME || '';

const app = express();

app.use(cors({ credentials: true, origin: `http://${CONSUMER_HOST}:${CONSUMER_PORT}` }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter());
app.use('/wallet', isAuthenticated, fetchWallet, walletRouter());
app.use('/transaction', isAuthenticated, fetchWallet, transactionRouter());

app.use(errorHandler);

app.listen(PORT, async () => {
    await connectToDatabase(DB_HOST, DB_PORT, DB_NAME);

    console.log(`Application started on port: ${PORT}`);
});
