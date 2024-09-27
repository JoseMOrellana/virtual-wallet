import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Wallet } from './types';

type virtualWalletState = {
    user: User | null;
    wallet: Wallet | null;
    paymentSessionToken: string;
    loginUser: (loggedUser: User) => void;
    loadWallet: (loadedWallet: Wallet | null) => void;
    setPaymentSessionToken: (token: string) => void;
    logout: () => void;
};

export const useVirtualWalletStore = create(
    persist<virtualWalletState>(
        (set) => ({
            user: null,
            wallet: null,
            paymentSessionToken: '',
            loginUser: (loggedUser: User) =>
                set(() => ({
                    user: loggedUser,
                })),
            loadWallet: (loadedWallet: Wallet | null) =>
                set(() => ({
                    wallet: loadedWallet,
                })),
            setPaymentSessionToken: (token: string) =>
                set(() => ({
                    paymentSessionToken: token,
                })),
            logout: () =>
                set(() => ({
                    user: null,
                    wallet: null,
                })),
        }),
        {
            name: 'virtual-wallet',
        },
    ),
);
