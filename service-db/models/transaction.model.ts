import mongoose, { Document, Schema, Model } from 'mongoose';

enum TransactionTypes {
    DEPOSIT = '+',
    PAYMENT = '-',
}

enum TransactionStatus {
    PENDING = 'PENDING',
    DONE = 'DONE',
    CANCELLED = 'CANCELLED',
}

type TransactionDocument = Document & {
    wallet: mongoose.Schema.Types.ObjectId;
    type: TransactionTypes;
    status: TransactionStatus;
    amount: Number;
    sessionToken: string;
    paymentToken: string;
};

const transactionSchema = new Schema<TransactionDocument>(
    {
        wallet: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Wallet',
        },
        type: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        sessionToken: {
            type: String,
            select: false,
        },
        paymentToken: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
        collection: 'transactions',
    },
);

const Transaction: Model<TransactionDocument> = mongoose.model('Transaction', transactionSchema);

const createTransaction = (values: Record<string, any>) => new Transaction(values).save().then((transaction) => transaction.toObject());
const getTransactionByTokens = (paymentToken: string, sessionToken: string) => Transaction.findOne({ paymentToken, sessionToken });
const getTransactionsByWallet = (wallet: string) => Transaction.find({ wallet }).sort({ updatedAt: 'desc' }).select('+sessionToken');

export { Transaction, TransactionDocument, TransactionTypes, TransactionStatus, createTransaction, getTransactionByTokens, getTransactionsByWallet };
