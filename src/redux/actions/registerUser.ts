import AsyncStorage from "@react-native-async-storage/async-storage";
import {URI} from "../../URI";
import axios, {AxiosError} from "axios";
import {Dispatch} from "react";
import {ActionType} from "typesafe-actions";
import * as types from "../types/types";
import {createAction} from "redux-actions";

type ResetPasswordSuccessPayload = { user: any };
type ResetPasswordFailedPayload = { error: string };

const registerUserRequest = createAction(types.REGISTER_USER_REQUEST);
const registerUserSuccess = createAction<ResetPasswordSuccessPayload>(
    types.REGISTER_USER_SUCCESS
);
const registerUserFailed = createAction<ResetPasswordFailedPayload>(
    types.REGISTER_USER_FAILED
);

type RegisterUserAction =
    | ActionType<typeof registerUserRequest>
    | ActionType<typeof registerUserSuccess>
    | ActionType<typeof registerUserFailed>;


export const registerUser = (
    name: string,
    email: string,
    password: string,
    avatar: string
) => async (dispatch: Dispatch<RegisterUserAction>) => {
    try {
        dispatch(registerUserRequest());

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            `${URI}/registration`,
            {name, email, password, avatar},
            config
        );

        dispatch(registerUserSuccess(data.user));

        await AsyncStorage.setItem("token", data.token);
    } catch (error) {
        dispatch(
            registerUserFailed(
                {error: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error"})
        );
    }
};

