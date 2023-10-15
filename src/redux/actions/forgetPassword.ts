import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {forgetPasswordFailed, forgetPasswordRequest, forgetPasswordSuccess} from "../types/types";

interface ForgetPasswordRequestAction {
    type: 'forgetPasswordRequest';
}

interface ForgetPasswordSuccessAction {
    type: 'forgetPasswordSuccess';
    payload: { code: string, email: string };
}

interface ForgetPasswordFailedAction {
    type: 'forgetPasswordFailed';
    payload: string;
}

type ForgetPasswordAction =
    | ForgetPasswordRequestAction
    | ForgetPasswordSuccessAction
    | ForgetPasswordFailedAction;

export const forgetPassword =
    (email: string) =>
        async (dispatch: Dispatch<ForgetPasswordAction>) => {
            try {
                dispatch({
                    type: forgetPasswordRequest,
                });

                const config = {headers: {'Content-Type': 'application/json'}};

                const {data} = await axios.post(
                    `${URI}/get-user-forget`,
                    {email},
                    config,
                );
                dispatch({
                    type: forgetPasswordSuccess,
                    payload: {code: data.code, email: email},
                });
            } catch (error: unknown) {
                dispatch({
                    type: forgetPasswordFailed,
                    payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
                });
            }
        };


