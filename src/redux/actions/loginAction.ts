import axios, {AxiosError} from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from "react";
import {URI} from "../../URI";
import {LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS} from "../types/types";

interface LoginUserRequestAction {
    type: typeof LOGIN_USER_REQUEST;
}

interface LoginUserSuccessAction {
    type: typeof LOGIN_USER_SUCCESS;
    payload: { user: string };
}

interface LoginUserFailedAction {
    type: typeof LOGIN_USER_FAILED;
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
                type: LOGIN_USER_REQUEST,
            });
            const config = {headers: {'Content-Type': 'application/json'}};
            const {data} = await axios.post(
                `${URI}/login`,
                {email, password},
                config,
            );
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: data.user,
            });
            if (data.token) {
                await AsyncStorage.setItem('token', data.token);
            }
        } catch (error: unknown) {
            dispatch({
                type: LOGIN_USER_FAILED,
                payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
            });
        }
    };
