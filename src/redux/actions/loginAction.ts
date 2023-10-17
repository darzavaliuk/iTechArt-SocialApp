import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from "react";
import { URI } from "../../URI";
import { createAction, ActionType } from "typesafe-actions";
import {
    LOGIN_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS
} from "../types/types";

const loginUserRequest = createAction(LOGIN_USER_REQUEST)();
const loginUserSuccess = createAction(LOGIN_USER_SUCCESS)<{ user: string }>();
const loginUserFailed = createAction(LOGIN_USER_FAILED)<string>();

type LoginUserAction =
    | ActionType<typeof loginUserRequest>
    | ActionType<typeof loginUserSuccess>
    | ActionType<typeof loginUserFailed>;

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch<LoginUserAction>) => {
    try {
        dispatch(loginUserRequest());

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`${URI}/login`, { email, password }, config);

        dispatch(loginUserSuccess(data.user));

        if (data.token) {
            await AsyncStorage.setItem('token', data.token);
        }
    } catch (error: unknown) {
        dispatch(loginUserFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error"));
    }
};
