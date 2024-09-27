import { useMutation } from '@tanstack/react-query';
import api from '../api/serviceClient';

async function confirmPayment(reqBody: object) {
    const { data } = await api.post('/transaction/validate', reqBody);
    return data;
}

export function useConfirmation() {
    return useMutation({ mutationFn: (reqBody: object) => confirmPayment(reqBody) });
}
