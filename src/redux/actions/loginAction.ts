import axios, {AxiosError} from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from "react";
import {URI} from "../../URI";
import {userLoginFailed, userLoginRequest, userLoginSuccess} from "../types/types";

interface LoginUserRequestAction {
    type: typeof userLoginRequest;
}

interface LoginUserSuccessAction {
    type: typeof userLoginSuccess;
    payload: { user: string };
}

interface LoginUserFailedAction {
    type: typeof userLoginFailed;
    payload: string;
}

type LoginUserAction =
    | LoginUserRequestAction
    | LoginUserSuccessAction
    | LoginUserFailedAction;


export const loginUser =
    (email: string, password: string) => async (dispatch: Dispatch<LoginUserAction>) => {
        try {
            dispatch({
                type: userLoginRequest,
            });
            const config = {headers: {'Content-Type': 'application/json'}};
            const {data} = await axios.post(
                `${URI}/login`,
                {email, password},
                config,
            );
            dispatch({
                type: userLoginSuccess,
                payload: data.user,
            });
            if (data.token) {
                await AsyncStorage.setItem('token', data.token);
            }
        } catch (error: unknown) {
            dispatch({
                type: userLoginFailed,
                payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
            });
        }
    };
