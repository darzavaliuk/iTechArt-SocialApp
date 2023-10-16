// register user
import AsyncStorage from "@react-native-async-storage/async-storage";
import {URI} from "../../URI";
import axios, {AxiosError} from "axios";
import {Dispatch} from "react";
import {userRegisterFailed, userRegisterRequest, userRegisterSuccess} from "../types/types";

interface RegisterUserRequestAction {
    type: typeof userRegisterRequest;
}

interface RegisterUserSuccessAction {
    type: typeof userRegisterSuccess;
    payload: { user: string };
}

interface RegisterUserFailedAction {
    type: typeof userRegisterFailed;
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
                    type: userRegisterRequest,
                });

                const config = {headers: {'Content-Type': 'application/json'}};

                const {data} = await axios.post(
                    `${URI}/registration`,
                    {name, email, password, avatar},
                    config,
                );
                dispatch({
                    type: userRegisterSuccess,
                    payload: data.user,
                });
                await AsyncStorage.setItem('token', data.token);
            } catch (error: unknown) {
                dispatch({
                    type: userRegisterFailed,
                    payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
                });
            }
        };
