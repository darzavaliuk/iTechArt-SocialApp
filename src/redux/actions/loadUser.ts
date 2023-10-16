import {Dispatch} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {userLoadFailed, userLoadRequest, userLoadSuccess} from "../types/types";

interface LoadUserRequestAction {
    type: 'userLoadRequest';
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
            type: userLoadRequest,
        });

        const token = await AsyncStorage.getItem('token');

        const {data} = await axios.get(`${URI}/me`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        dispatch({
            type: userLoadSuccess,
            payload: {
                user: data.user,
                token,
            },
        });
    } catch (error: unknown) {
        dispatch({
            type: userLoadFailed,
            payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
        });
    }
};
