import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {
    LOAD_USER_FAILED,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS
} from "../actionTypes/actionTypes";
import {getToken} from "../../utils/getToken";

const loadUserRequest = createAction(LOAD_USER_REQUEST);
const loadUserSuccess = createAction<{
    user: string,
    token: string | undefined
}, typeof LOAD_USER_SUCCESS>(LOAD_USER_SUCCESS);
const loadUserFailed = createAction<string, typeof LOAD_USER_FAILED>(LOAD_USER_FAILED);

type LoadUserAction =
    | ReturnType<typeof loadUserRequest>
    | ReturnType<typeof loadUserSuccess>
    | ReturnType<typeof loadUserFailed>;

export const loadUser = () => async (dispatch: Dispatch<LoadUserAction>) => {
    try {
        dispatch(loadUserRequest());

        let token: string | undefined = "";

        try {
            token = await getToken();
            console.log(token);
        } catch (error) {
            dispatch(loadUserFailed((error as AxiosError<{
                message: string
            }>)?.response?.data?.message || "Unexpected error"));
            return;
        }

        const {data} = await axios.get(`${URI}/me`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        dispatch(loadUserSuccess({user: data.user, token}));
    } catch (error: unknown) {
        dispatch(loadUserFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
