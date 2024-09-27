import { useMutation } from '@tanstack/react-query';
import api from '../api/serviceClient';

async function createDeposit(amount: number) {
    const { data } = await api.post('/transaction/deposit', { amount });
    return data;
}

export function useDeposit() {
    return useMutation({ mutationFn: (amount: number) => createDeposit(amount) });
}
