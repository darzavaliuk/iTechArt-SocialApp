import AsyncStorage from "@react-native-async-storage/async-storage";
import { URI } from "../../URI";
import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import { createAction } from "@reduxjs/toolkit";
import * as types from "../actionTypes/actionTypes";
import { setToken } from "../../utils/setToken";

type ResetPasswordSuccessPayload = { user: any };
type ResetPasswordFailedPayload = { error: string };

const registerUserRequest = createAction(types.REGISTER_USER_REQUEST);
const registerUserSuccess = createAction<ResetPasswordSuccessPayload>(types.REGISTER_USER_SUCCESS);
const registerUserFailed = createAction<ResetPasswordFailedPayload>(types.REGISTER_USER_FAILED);

type RegisterUserAction =
    | ReturnType<typeof registerUserRequest>
    | ReturnType<typeof registerUserSuccess>
    | ReturnType<typeof registerUserFailed>;

export const registerUser = (
    name: string,
    email: string,
    password: string,
    avatar: string
) => async (dispatch: Dispatch<RegisterUserAction>) => {
    try {
        dispatch(registerUserRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `${URI}/registration`,
            { name, email, password, avatar },
            config
        );

        dispatch(registerUserSuccess({ user: data.user }));

        await AsyncStorage.setItem("token", data.token);
        try {
            await setToken(data.token);
        } catch (error) {
            dispatch(registerUserFailed({ error: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error" }));
        }
    } catch (error) {
        dispatch(registerUserFailed({ error: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error" }));
    }
};
