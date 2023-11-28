import {Dispatch} from "redux";
import {getToken} from "../../utils/getToken";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {GET_REPLIES_FAILED, GET_REPLIES_REQUEST, GET_REPLIES_SUCCESS} from "../actionTypes/actionTypes";

const getRepliesRequest = createAction(GET_REPLIES_REQUEST);
const getRepliesSuccess = createAction<any, typeof GET_REPLIES_SUCCESS>(GET_REPLIES_SUCCESS);
const getRepliesFailed = createAction<any, typeof GET_REPLIES_FAILED>(GET_REPLIES_FAILED);

export type GetRepliesAction =
    | ReturnType<typeof getRepliesRequest>
    | ReturnType<typeof getRepliesSuccess>
    | ReturnType<typeof getRepliesFailed>;


export const getReplies = () => async (dispatch: Dispatch<GetRepliesAction>) => {
    try {
        dispatch(getRepliesRequest());

        const token = await getToken()

        const {data} = await axios.get(`${URI}/get-replies`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const dataPosts = data.posts

        dispatch(getRepliesSuccess({dataPosts}));
    } catch (error) {
        dispatch(
            getRepliesFailed(
                (error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"
            )
        );
    }
};
