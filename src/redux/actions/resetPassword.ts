import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";

export const resetPassword =
    (email: string, password: string) =>
        async (dispatch: Dispatch<any>) => {
            try {
                dispatch({
                    type: 'resetPasswordRequest',
                });

                const config = {headers: {'Content-Type': 'application/json'}};

                const {data} = await axios.post(
                    `${URI}/reset-password`,
                    {email, password},
                    config,
                );
                dispatch({
                    type: 'resetPasswordSuccess',
                    payload: data,
                });
            } catch (error: any) {
                dispatch({
                    type: 'resetPasswordFailed',
                    payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
                });
            }
        };
