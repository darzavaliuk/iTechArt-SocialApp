import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {
    LOGIN_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS
} from "../actionTypes/actionTypes";
import {setRefreshToken, setToken} from "../../utils/setToken";
import {loginUserFailed, loginUserRequest, loginUserSuccess} from "./createAction";

type LoginUserAction =
    | ReturnType<typeof loginUserRequest>
    | ReturnType<typeof loginUserSuccess>
    | ReturnType<typeof loginUserFailed>;

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch<LoginUserAction>) => {
    try {
        dispatch(loginUserRequest());

        const config = {headers: {"Content-Type": "application/json"}};

        const { data } = await axios.post(`${URI}/login`, {email, password}, config);

        dispatch(loginUserSuccess({user: data.user}));

        if (data.token) {
            try {
                await setToken(data.token);
            } catch (error) {
                dispatch(loginUserFailed((error as AxiosError<{
                    message: string
                }>)?.response?.data?.message || "Unexpected error"));
            }
        }

        console.log(data.token)

        if (data.refreshToken) {
            try {
                await setRefreshToken(data.refreshToken);
            } catch (error) {
                dispatch(loginUserFailed((error as AxiosError<{
                    message: string
                }>)?.response?.data?.message || "Unexpected error"));
            }
        }
    } catch (error: unknown) {
        dispatch(loginUserFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
