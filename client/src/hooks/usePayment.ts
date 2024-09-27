import { useMutation } from '@tanstack/react-query';
import api from '../api/serviceClient';

async function createPayment(amount: number) {
    const { data } = await api.post('/transaction/payment', { amount });
    return data;
}

export function usePayment() {
    return useMutation({ mutationFn: (amount: number) => createPayment(amount) });
}
