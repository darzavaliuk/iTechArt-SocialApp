import {createAction} from "@reduxjs/toolkit";
import * as types from "../actionTypes/actionTypes";
import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {LOAD_USER_FAILED, LOAD_USER_SUCCESS} from "../actionTypes/actionTypes";
import {getToken} from "../../utils/getToken";
import {URI} from "../../URI";

const isLoading = createAction(types.LOADING);

const isNotLoading = createAction(types.NOT_LOADING);

const loadUserSuccess = createAction<{
    user: string,
    token: string | undefined
}, typeof LOAD_USER_SUCCESS>(LOAD_USER_SUCCESS);
const loadUserFailed = createAction<string, typeof LOAD_USER_FAILED>(LOAD_USER_FAILED);

export type LoadUserAction =
    | ReturnType<typeof loadUserSuccess>
    | ReturnType<typeof loadUserFailed>;

function getTokenRequest(dispatch: Dispatch<LoadUserAction>) {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            try {
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

export const loadUserThunk = async (dispatch: Dispatch<any>) => {
    dispatch(isLoading())
    try {
        const {token, data} = await getAllRequests(dispatch)
        dispatch(loadUserSuccess({user: data.user, token}));
    } catch (error: unknown) {
        dispatch(loadUserFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
    dispatch(isNotLoading())
}
