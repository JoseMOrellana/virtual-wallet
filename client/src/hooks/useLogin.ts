import { useMutation } from '@tanstack/react-query';
import api from '../api/serviceClient';

async function postLogin(reqBody: object) {
    const { data } = await api.post('/auth/login', reqBody);
    return data;
}

export function useLogin() {
    return useMutation({ mutationFn: (reqBody: object) => postLogin(reqBody) });
}
