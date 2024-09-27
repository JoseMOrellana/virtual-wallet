import mongoose, { Document, Schema, Model } from 'mongoose';

type WalletDocument = Document & {
    user: mongoose.Schema.Types.ObjectId;
    balance: number;
};

const walletSchema = new Schema<WalletDocument>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        balance: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'wallets',
    },
);

const Wallet: Model<WalletDocument> = mongoose.model('Wallet', walletSchema);

const createWallet = (values: Record<string, any>) => new Wallet(values).save().then((wallet) => wallet.toObject());
const getWalletByUser = (user: string) => Wallet.findOne({ user });

export { Wallet, WalletDocument, createWallet, getWalletByUser };
