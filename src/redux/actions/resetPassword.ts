import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from "../types/types";

interface ResetPasswordRequestAction {
    type: typeof RESET_PASSWORD_REQUEST;
}

interface ResetPasswordSuccessAction {
    type: typeof RESET_PASSWORD_SUCCESS;
    payload: { user: string };
}

interface ResetPasswordFailedAction {
    type: typeof RESET_PASSWORD_FAILED;
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
                    type: RESET_PASSWORD_REQUEST,
                });

                const config = {headers: {'Content-Type': 'application/json'}};

                const {data} = await axios.post(
                    `${URI}/reset-password`,
                    {email, password},
                    config,
                );
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    payload: data,
                });
            } catch (error: unknown) {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
                });
            }
        };
