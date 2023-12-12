import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {getToken} from "../../utils/getToken";
import {SubTarget} from "../reducers/User";
import {createTargetFailed, createTargetRequest, createTargetSuccess} from "./createAction";

export type LoadTargetsAction =
    | ReturnType<typeof createTargetRequest>
    | ReturnType<typeof createTargetSuccess>
    | ReturnType<typeof createTargetFailed>;

async function getTokenRequest() {
    return await getToken();
}

async function getDataRequest(token: string, subtargets: SubTarget, subtitle: string) {
    const {data} = await axios.post(`${URI}/create-target`, {
        subtargets,
        subtitle
    }, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return data
}

async function getAllRequests(subtargets: SubTarget, subtitle: string) {
    const token = await getTokenRequest();
    if (token)
        await getDataRequest(token, subtargets, subtitle)
    return {token};
}

export const createTarget = (subtargets: SubTarget, subtitle: string) => async (dispatch: Dispatch<LoadTargetsAction>) => {
    try {
        dispatch(createTargetRequest());
        const {token} = await getAllRequests(subtargets, subtitle)
        dispatch(createTargetSuccess({subtargets, subtitle}));
    } catch (error) {
        dispatch(createTargetFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
