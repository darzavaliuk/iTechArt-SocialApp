import { createAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { URI } from "../../URI";
import { Dispatch } from "redux";
import * as types from "../actionTypes/actionTypes";

type ResetPasswordRequestPayload = void;
type ResetPasswordSuccessPayload = { data: any };
type ResetPasswordFailedPayload = { error: string };

const resetPasswordRequest = createAction<ResetPasswordRequestPayload>(types.RESET_PASSWORD_REQUEST);
const resetPasswordSuccess = createAction<ResetPasswordSuccessPayload>(types.RESET_PASSWORD_SUCCESS);
const resetPasswordFailed = createAction<ResetPasswordFailedPayload>(types.RESET_PASSWORD_FAILED);

type ResetPasswordAction =
    | ReturnType<typeof resetPasswordRequest>
    | ReturnType<typeof resetPasswordSuccess>
    | ReturnType<typeof resetPasswordFailed>;

export const resetPassword = (email: string, password: string) => async (dispatch: Dispatch<ResetPasswordAction>) => {
    try {
        dispatch(resetPasswordRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`${URI}/reset-password`, { email, password }, config);

        dispatch(resetPasswordSuccess({ data }));
    } catch (error) {
        dispatch(
            resetPasswordFailed({ error: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error" })
        );
    }
};
