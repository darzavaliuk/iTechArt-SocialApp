import axios, {AxiosError} from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from "react";
import {URI} from "../../URI";

export const loginUser =
    (email: string, password: string) => async (dispatch: Dispatch<any>) => {
        try {
            dispatch({
                type: 'userLoginRequest',
            });
            const config = {headers: {'Content-Type': 'application/json'}};
            const {data} = await axios.post(
                `${URI}/login`,
                {email, password},
                config,
            );
            dispatch({
                type: 'userLoginSuccess',
                payload: data.user,
            });
            if (data.token) {
                await AsyncStorage.setItem('token', data.token);
            }
        } catch (error: unknown) {
            dispatch({
                type: 'userLoginFailed',
                payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
            });
        }
    };
