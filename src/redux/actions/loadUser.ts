import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {LOAD_USER_FAILED, LOAD_USER_REQUEST, LOAD_USER_SUCCESS} from "../actionTypes/actionTypes";
import {getToken} from "../../utils/getToken";

const loadUserRequest = createAction(LOAD_USER_REQUEST);
const loadUserSuccess = createAction<{
    user: string,
    token: string | undefined
}, typeof LOAD_USER_SUCCESS>(LOAD_USER_SUCCESS);
const loadUserFailed = createAction<string, typeof LOAD_USER_FAILED>(LOAD_USER_FAILED);

export type LoadUserAction =
    | ReturnType<typeof loadUserRequest>
    | ReturnType<typeof loadUserSuccess>
    | ReturnType<typeof loadUserFailed>;

async function getTokenRequest() {
    return await getToken();
}

async function getDataRequest(token: string) {
    const {data} = await axios.get(`${URI}/me`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return data
}

async function getAllRequests() {
    const token = await getTokenRequest();
    let data;
    if (token)
        data = await getDataRequest(token!)
    return {token, data};
}

export const loadUser = () => async (dispatch: Dispatch<LoadUserAction>) => {
    try {
        dispatch(loadUserRequest());
        const {token, data} = await getAllRequests()
        dispatch(loadUserSuccess({user: data.user, token}));
    } catch (error) {
        dispatch(loadUserFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
