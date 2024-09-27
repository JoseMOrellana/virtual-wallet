import express from 'express';
import { authRouter } from './routes/auth.route';
import { errorHandler, isAuthenticated } from './middlewares';
import 'express-async-errors';
import { walletRouter } from './routes/wallet.route';
import cookieParser from 'cookie-parser';
import { transactionRouter } from './routes/transaction.route';
import cors from 'cors';

const PORT = parseInt(process.env.PORT || '3000');

const CONSUMER_HOST = process.env.CONSUMER_HOST || '';
const CONSUMER_PORT = parseInt(process.env.CONSUMER_PORT || '5173');

const app = express();

app.use(cors({ credentials: true, origin: `http://${CONSUMER_HOST}:${CONSUMER_PORT}` }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter());
app.use('/wallet', isAuthenticated, walletRouter());
app.use('/transaction', isAuthenticated, transactionRouter());

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Application started on port: ${PORT}`);
});
