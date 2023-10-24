import {createAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {Dispatch} from "redux";
import * as types from "../actionTypes/actionTypes";

const resetPasswordRequest = createAction(types.RESET_PASSWORD_REQUEST);
const resetPasswordSuccess = createAction<{ data: any }>(types.RESET_PASSWORD_SUCCESS);
const resetPasswordFailed = createAction<{ error: string }>(types.RESET_PASSWORD_FAILED);

type ResetPasswordAction =
    | ReturnType<typeof resetPasswordRequest>
    | ReturnType<typeof resetPasswordSuccess>
    | ReturnType<typeof resetPasswordFailed>;

export const resetPassword = (email: string, password: string) => async (dispatch: Dispatch<ResetPasswordAction>) => {
    try {
        dispatch(resetPasswordRequest());

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(`${URI}/reset-password`, {email, password}, config);

        dispatch(resetPasswordSuccess({data}));
    } catch (error) {
        dispatch(
            resetPasswordFailed({
                error: (error as AxiosError<{
                    message: string
                }>)?.response?.data?.message || "Unexpected error"
            })
        );
    }
};
