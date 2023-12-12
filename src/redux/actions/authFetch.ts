import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import {getRefreshToken, getToken} from "../../utils/getToken";
import {setRefreshToken, setToken} from "../../utils/setToken";

interface Token {
    accessToken: string;
    refreshToken: string;
}

interface ErrorResponse {
    error: string;
    message: string;
}

export const authRequest = async <T>(
    method: AxiosRequestConfig['method'],
    url: string,
    data?: any,
    config?: any
): Promise<T> => {
    const token = await getToken();

    try {
        const response: AxiosResponse<T> = await axios({
            method,
            url,
            data,
            ...config,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if ((error as AxiosError<{ message: string }>).response && error.response.status === 401) {
            const newToken= await refreshToken();

            if (newToken) {
                return authRequest<T>(method, url, data, config);
            } else {
                logout();
            }
        }

        throw error;
    }
};

const refreshToken = async (): Promise<Token | null> => {
    try {
        const response = await axios.post('/refresh-token', {
            refreshToken: await getRefreshToken(),
        });

        const newToken = response.data.token;
        await setToken(newToken);

        return newToken;
    } catch (error) {
        console.log('Failed to refresh token:', error);
        return null;
    }
};

const logout = async () => {
    await setRefreshToken("")
    await setToken("")
};
