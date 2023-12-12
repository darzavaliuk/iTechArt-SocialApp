import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {getToken} from "../../utils/getToken";
import {SET_TARGET_FAILED, SET_TARGET_REQUEST, SET_TARGET_SUCCESS} from "../actionTypes/actionTypes";
import {SubTarget} from "../reducers/User";
import {authRequest} from "./authFetch";
import {setTargetFailed, setTargetRequest, setTargetSuccess} from "./createAction";

export type LoadTargetsAction =
    | ReturnType<typeof setTargetRequest>
    | ReturnType<typeof setTargetSuccess>
    | ReturnType<typeof setTargetFailed>;

async function getTokenRequest() {
    return await getToken();
}

async function getDataRequest(token: string, subtargets: SubTarget, id: string) {
    const {data} = await axios.post(`${URI}/set-target`, {
        subtargets, id
    }, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return data
}

async function getAllRequests(subtargets: SubTarget, id: string) {
    const token = await getTokenRequest();
    if (token)
        await getDataRequest(token, subtargets, id)
    return {token};
}

export const setTarget = (subtargets: SubTarget, id: string) => async (dispatch: Dispatch<LoadTargetsAction>) => {
    try {
        dispatch(setTargetRequest());

        await authRequest<any>('post', `${URI}/set-target`, {
            subtargets, id
        },);

        dispatch(setTargetSuccess({subtargets}));
    } catch (error: unknown) {
        dispatch(setTargetFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
