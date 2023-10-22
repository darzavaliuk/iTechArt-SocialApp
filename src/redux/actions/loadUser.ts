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

function getTokenRequest(dispatch: Dispatch<LoadUserAction>) {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            try {
                console.log("token")
                const token = await getToken();
                resolve(token)
            } catch (error) {
                dispatch(loadUserFailed((error as AxiosError<{
                    message: string
                }>)?.response?.data?.message || "Unexpected error"));
                reject(error)
            }
        }, 0)
    })
}

async function getDataRequest(token: string) {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            try {
                console.log(token)
                const {data} = await axios.get(`${URI}/me`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                console.log(data)
                resolve(data);
            } catch (error) {
                reject(error)
            }
        }, 0)
    })
}

async function getAllRequests(dispatch: Dispatch<LoadUserAction>) {
    const token = await getTokenRequest(dispatch) as string;
    const data = await getDataRequest(token!) as any
    return {token, data};
}

export const loadUser = () => async (dispatch: Dispatch<LoadUserAction>) => {
    try {
        dispatch(loadUserRequest());
        const {token, data} = await getAllRequests(dispatch)
        dispatch(loadUserSuccess({user: data.user, token}));
    } catch (error: unknown) {
        dispatch(loadUserFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
