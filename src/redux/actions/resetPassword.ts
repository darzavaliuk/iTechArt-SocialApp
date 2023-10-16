import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {
    resetPasswordFailed,
    resetPasswordRequest,
    resetPasswordSuccess
} from "../types/types";

interface ResetPasswordRequestAction {
    type: typeof resetPasswordRequest;
}

interface ResetPasswordSuccessAction {
    type: typeof resetPasswordSuccess;
    payload: { user: string };
}

interface ResetPasswordFailedAction {
    type: typeof resetPasswordFailed;
    payload: string;
}

type ResetPasswordAction =
    | ResetPasswordRequestAction
    | ResetPasswordSuccessAction
    | ResetPasswordFailedAction;


export const resetPassword =
    (email: string, password: string) =>
        async (dispatch: Dispatch<ResetPasswordAction>) => {
            try {
                dispatch({
                    type: resetPasswordRequest,
                });

                const config = {headers: {'Content-Type': 'application/json'}};

                const {data} = await axios.post(
                    `${URI}/reset-password`,
                    {email, password},
                    config,
                );
                dispatch({
                    type: resetPasswordSuccess,
                    payload: data,
                });
            } catch (error: unknown) {
                dispatch({
                    type: resetPasswordFailed,
                    payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
                });
            }
        };
