import { useMutation } from '@tanstack/react-query';
import api from '../api/serviceClient';

async function postRegister(reqBody: object) {
    const { data } = await api.post('/auth/register', reqBody);
    return data;
}

export function useRegister() {
    return useMutation({ mutationFn: (reqBody: object) => postRegister(reqBody) });
}
