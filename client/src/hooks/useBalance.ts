import { useMutation } from '@tanstack/react-query';
import api from '../api/serviceClient';

export type BalanceQuery = {
    document: string;
    phone: string;
};

async function getBalance(query: BalanceQuery) {
    const { document, phone } = query;
    const { data } = await api.get('/wallet', {
        params: { document, phone },
    });
    return data;
}

export function useBalance() {
    return useMutation({ mutationFn: (query: BalanceQuery) => getBalance(query) });
}
