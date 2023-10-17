import { Dispatch } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { URI } from "../../URI";
import { createAction, ActionType } from "typesafe-actions";
import {
    LOAD_USER_FAILED,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS
} from "../types/types";

const loadUserRequest = createAction(LOAD_USER_REQUEST)();
const loadUserSuccess = createAction(LOAD_USER_SUCCESS)<{ user: string, token: string | null }>();
const loadUserFailed = createAction(LOAD_USER_FAILED)<string>();

type LoadUserAction =
    | ActionType<typeof loadUserRequest>
    | ActionType<typeof loadUserSuccess>
    | ActionType<typeof loadUserFailed>;

export const loadUser = () => async (dispatch: Dispatch<LoadUserAction>) => {
    try {
        dispatch(loadUserRequest());

        const token = await AsyncStorage.getItem('token');

        const { data } = await axios.get(`${URI}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(loadUserSuccess({ user: data.user, token }));
    } catch (error: unknown) {
        dispatch(loadUserFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error"));
    }
};
