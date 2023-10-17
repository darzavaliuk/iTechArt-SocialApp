import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";

export const verifyCode =
    (email: string, code: string) =>
        async (dispatch: Dispatch<any>) => {
            try {
                dispatch({
                    type: 'verifyPasswordRequest',
                });

                const config = {headers: {'Content-Type': 'application/json'}};

                const {data} = await axios.post(
                    `${URI}/verify-code`,
                    {email, code},
                    config,
                );
                dispatch({
                    type: 'verifyPasswordSuccess',
                    payload: data,
                });
            } catch (error: unknown) {
                dispatch({
                    type: 'verifyPasswordFailed',
                    payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
                });
            }
        };
