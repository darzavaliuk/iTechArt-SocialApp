import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { URI } from "../../URI";
import { createAction } from "@reduxjs/toolkit";
import {
    LOGIN_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS
} from "../actionTypes/actionTypes";
import { setToken } from "../../utils/setToken";

const loginUserRequest = createAction(LOGIN_USER_REQUEST);
const loginUserSuccess = createAction<{ user: string }, typeof LOGIN_USER_SUCCESS>(LOGIN_USER_SUCCESS);
const loginUserFailed = createAction<string, typeof LOGIN_USER_FAILED>(LOGIN_USER_FAILED);

type LoginUserAction =
    | ReturnType<typeof loginUserRequest>
    | ReturnType<typeof loginUserSuccess>
    | ReturnType<typeof loginUserFailed>;

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch<LoginUserAction>) => {
    try {
        dispatch(loginUserRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`${URI}/login`, { email, password }, config);

        dispatch(loginUserSuccess({ user: data.user }));

        if (data.token) {
            try {
                console.log(data.token)
                await setToken(data.token);
            } catch (error) {
                dispatch(loginUserFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error"));
            }
        }
    } catch (error: unknown) {
        dispatch(loginUserFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error"));
    }
};
