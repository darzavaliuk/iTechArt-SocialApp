import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {
    LOAD_TARGETS_FAILED,
    LOAD_TARGETS_REQUEST,
    LOAD_TARGETS_SUCCESS,
} from "../actionTypes/actionTypes";
import {getToken} from "../../utils/getToken";

const loadTargetsRequest = createAction(LOAD_TARGETS_REQUEST);
const loadTargetsSuccess = createAction<any, typeof LOAD_TARGETS_SUCCESS>(LOAD_TARGETS_SUCCESS);
const loadTargetsFailed = createAction<any, typeof LOAD_TARGETS_FAILED>(LOAD_TARGETS_FAILED);

export type LoadTargetsAction =
    | ReturnType<typeof loadTargetsRequest>
    | ReturnType<typeof loadTargetsSuccess>
    | ReturnType<typeof loadTargetsFailed>;

async function getTokenRequest() {
    return await getToken();
}

async function getDataRequest(token: string) {
    console.log("token", token)
    const {data} = await axios.post(`${URI}/get-targets`, {}, {
        headers: {Authorization: `Bearer ${token}`},
    });
    console.log("<<<data", data.targets)
    return data.targets
}

async function getAllRequests() {
    const token = await getTokenRequest();
    const targets = await getDataRequest(token!)
    console.log("data1", targets.subTargets)
    return {token, targets};
}

export const loadTargets = () => async (dispatch: Dispatch<LoadTargetsAction>) => {
    try {
        dispatch(loadTargetsRequest());
        const {token, targets} = await getAllRequests()
        console.log("data", token, targets)
        dispatch(loadTargetsSuccess({targets, token}));
    } catch (error: unknown) {
        dispatch(loadTargetsFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
