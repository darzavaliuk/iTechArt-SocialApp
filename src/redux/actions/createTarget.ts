import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {getToken} from "../../utils/getToken";
import {CREATE_TARGET_FAILED, CREATE_TARGET_REQUEST, CREATE_TARGET_SUCCESS} from "../actionTypes/actionTypes";

const createTargetRequest = createAction(CREATE_TARGET_REQUEST);
const createTargetSuccess = createAction<any, typeof CREATE_TARGET_SUCCESS>(CREATE_TARGET_SUCCESS);
const createTargetFailed = createAction<any, typeof CREATE_TARGET_FAILED>(CREATE_TARGET_FAILED);

export type LoadTargetsAction =
    | ReturnType<typeof createTargetRequest>
    | ReturnType<typeof createTargetSuccess>
    | ReturnType<typeof createTargetFailed>;

async function getTokenRequest() {
    return await getToken();
}

async function getDataRequest(token: string, subtargets: any, subtitle: string) {
    console.log("token", token)
    const {data} = await axios.post(`${URI}/create-target`, {
        subtargets,
        subtitle
    }, {
        headers: {Authorization: `Bearer ${token}`},
    });
    console.log("<<<data", data);
    return data
}

async function getAllRequests(subtargets: any, subtitle: string) {
    const token = await getTokenRequest();
     await getDataRequest(token!, subtargets, subtitle)
    return {token};
}

export const createTarget = (subtargets: any, subtitle: string) => async (dispatch: Dispatch<LoadTargetsAction>) => {
    try {
        dispatch(createTargetRequest());
        const {token} = await getAllRequests(subtargets, subtitle)
        console.log(token)
        dispatch(createTargetSuccess({subtargets, subtitle}));
    } catch (error: unknown) {
        dispatch(createTargetFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
