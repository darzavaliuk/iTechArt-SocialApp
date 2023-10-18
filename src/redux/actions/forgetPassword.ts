import { Dispatch } from "react";
import axios, { AxiosError } from "axios";
import { URI } from "../../URI";
import { createAction } from "@reduxjs/toolkit";
import {
    FORGET_PASSWORD_FAILED,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
} from "../actionTypes/actionTypes";

const forgetPasswordRequest = createAction(FORGET_PASSWORD_REQUEST);
const forgetPasswordSuccess = createAction<{ code: string; email: string }>(
    FORGET_PASSWORD_SUCCESS
);
const forgetPasswordFailed = createAction<string>(FORGET_PASSWORD_FAILED);

type ForgetPasswordAction =
    | ReturnType<typeof forgetPasswordRequest>
    | ReturnType<typeof forgetPasswordSuccess>
    | ReturnType<typeof forgetPasswordFailed>;

export const forgetPassword = (email: string) => async (
    dispatch: Dispatch<ForgetPasswordAction>
) => {
    try {
        dispatch(forgetPasswordRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `${URI}/get-user-forget`,
            { email },
            config
        );

        dispatch(forgetPasswordSuccess({ code: data.code, email }));
    } catch (error: unknown) {
        dispatch(
            forgetPasswordFailed(
                (error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"
            )
        );
    }
};
