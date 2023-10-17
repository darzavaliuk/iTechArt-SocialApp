import { Dispatch } from "react";
import axios, { AxiosError } from "axios";
import { URI } from "../../URI";
import { createAction, ActionType } from "typesafe-actions";
import {
    LOAD_USER_FAILED,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS
} from "../actionTypes/actionTypes";
import {getToken} from "../../utils/getToken";

const loadUserRequest = createAction(LOAD_USER_REQUEST)();
const loadUserSuccess = createAction(LOAD_USER_SUCCESS)<{ user: string, token: string | undefined }>();
const loadUserFailed = createAction(LOAD_USER_FAILED)<string>();

type LoadUserAction =
    | ActionType<typeof loadUserRequest>
    | ActionType<typeof loadUserSuccess>
    | ActionType<typeof loadUserFailed>;

export const loadUser = () => async (dispatch: Dispatch<LoadUserAction>) => {
    try {
        dispatch(loadUserRequest());

        let token = "";

        getToken().then((token) => {
            const tokenString: string | undefined = token;
            console.log(tokenString);
        }).catch((error) => {
            dispatch(loadUserFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error"));
        });

        const { data } = await axios.get(`${URI}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(loadUserSuccess({ user: data.user, token }));
    } catch (error: unknown) {
        dispatch(loadUserFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error"));
    }
};
