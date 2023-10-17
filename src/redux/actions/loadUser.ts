import {Dispatch} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {LOAD_USER_FAILED, LOAD_USER_REQUEST, LOAD_USER_SUCCESS} from "../types/types";

interface LoadUserRequestAction {
    type: typeof LOAD_USER_REQUEST;
}

interface LoadUserSuccessAction {
    type: 'userLoadSuccess';
    payload: { user: string, token: string | null };
}

interface LoadUserFailedAction {
    type: 'userLoadFailed';
    payload: string;
}

type LoadUserAction =
    | LoadUserRequestAction
    | LoadUserSuccessAction
    | LoadUserFailedAction;


export const loadUser = () => async (dispatch: Dispatch<LoadUserAction>) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST,
        });

        const token = await AsyncStorage.getItem('token');

        const {data} = await axios.get(`${URI}/me`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: {
                user: data.user,
                token,
            },
        });
    } catch (error: unknown) {
        dispatch({
            type: LOAD_USER_FAILED,
            payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
        });
    }
};
