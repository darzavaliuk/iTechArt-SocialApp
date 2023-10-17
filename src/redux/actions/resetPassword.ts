import { createAction } from 'redux-actions';
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {Dispatch} from "react";
import {ActionType} from "typesafe-actions";
import {RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS} from "../actionTypes/actionTypes";

type ResetPasswordRequestPayload = void;
type ResetPasswordSuccessPayload = { data: any };
type ResetPasswordFailedPayload = { error: string };

const resetPasswordRequest = createAction<ResetPasswordRequestPayload>(RESET_PASSWORD_REQUEST);
const resetPasswordSuccess = createAction<ResetPasswordSuccessPayload>(RESET_PASSWORD_SUCCESS);
const resetPasswordFailed = createAction<ResetPasswordFailedPayload>(RESET_PASSWORD_FAILED);

type ResetPasswordAction =
    | ActionType<typeof resetPasswordRequest>
    | ActionType<typeof resetPasswordSuccess>
    | ActionType<typeof resetPasswordFailed>;

export const resetPassword = (email: string, password: string) => async (dispatch: Dispatch<ResetPasswordAction>) => {
    try {
        dispatch(resetPasswordRequest());

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`${URI}/reset-password`, { email, password }, config);

        dispatch(resetPasswordSuccess({ data }));
    } catch (error) {
        dispatch(resetPasswordFailed({ error: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error" }));
    }
};
