export interface Document {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Authentication {
    password: string;
    salt: string;
    sessionToken: string;
}

export type User = Document & {
    authentication: Authentication;
    document: string;
    name: string;
    email: string;
    phone: string;
};

export interface Wallet {
    wallet: WalletInfo;
    transactions: TransactionsInfo[];
}

export type TransactionsInfo = Document & {
    wallet: string;
    type: string;
    status: string;
    amount: number;
    sessionToken: string;
};

export type WalletInfo = Document & {
    user: string;
    balance: number;
};
