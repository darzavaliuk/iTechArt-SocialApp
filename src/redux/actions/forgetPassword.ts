import { Dispatch } from "react";
import axios, { AxiosError } from "axios";
import { URI } from "../../URI";
import { createAction, ActionType } from "typesafe-actions";
import {
    FORGET_PASSWORD_FAILED,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS
} from "../types/types";

const forgetPasswordRequest = createAction(FORGET_PASSWORD_REQUEST)();
const forgetPasswordSuccess = createAction(FORGET_PASSWORD_SUCCESS)<{ code: string, email: string }>();
const forgetPasswordFailed = createAction(FORGET_PASSWORD_FAILED)<string>();

type ForgetPasswordAction =
    | ActionType<typeof forgetPasswordRequest>
    | ActionType<typeof forgetPasswordSuccess>
    | ActionType<typeof forgetPasswordFailed>;

export const forgetPassword = (email: string) => async (dispatch: Dispatch<ForgetPasswordAction>) => {
    try {
        dispatch(forgetPasswordRequest());

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`${URI}/get-user-forget`, { email }, config);

        dispatch(forgetPasswordSuccess({ code: data.code, email }));
    } catch (error: unknown) {
        dispatch(forgetPasswordFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error"));
    }
};
