// register user
import AsyncStorage from "@react-native-async-storage/async-storage";
import {URI} from "../../URI";
import axios, {AxiosError} from "axios";
import {Dispatch} from "react";
import {REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS} from "../types/types";

interface RegisterUserRequestAction {
    type: typeof REGISTER_USER_REQUEST;
}

interface RegisterUserSuccessAction {
    type: typeof REGISTER_USER_SUCCESS;
    payload: { user: string };
}

interface RegisterUserFailedAction {
    type: typeof REGISTER_USER_FAILED;
    payload: string;
}

type RegisterUserAction =
    | RegisterUserRequestAction
    | RegisterUserSuccessAction
    | RegisterUserFailedAction;


export const registerUser =
    (name: string, email: string, password: string, avatar: string) =>
        async (dispatch: Dispatch<RegisterUserAction>) => {
            try {
                dispatch({
                    type: REGISTER_USER_REQUEST,
                });

                const config = {headers: {'Content-Type': 'application/json'}};

                const {data} = await axios.post(
                    `${URI}/registration`,
                    {name, email, password, avatar},
                    config,
                );
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: data.user,
                });
                await AsyncStorage.setItem('token', data.token);
            } catch (error: unknown) {
                dispatch({
                    type: REGISTER_USER_FAILED,
                    payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
                });
            }
        };
