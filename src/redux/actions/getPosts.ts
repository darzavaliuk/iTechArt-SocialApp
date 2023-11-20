import {Dispatch} from "redux";
import {getToken} from "../../utils/getToken";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {GET_POST_FAILED, GET_POST_REQUEST, GET_POST_SUCCESS} from "../actionTypes/actionTypes";

const getRepliesRequest = createAction(GET_POST_REQUEST);
const getRepliesSuccess = createAction<any, typeof GET_POST_SUCCESS>(GET_POST_SUCCESS);
const getRepliesFailed = createAction<any, typeof GET_POST_FAILED>(GET_POST_FAILED);

export type GetPostsAction =
    | ReturnType<typeof getRepliesRequest>
    | ReturnType<typeof getRepliesSuccess>
    | ReturnType<typeof getRepliesFailed>;

export const getPosts = () => async (dispatch: Dispatch<GetPostsAction>) => {
    try {
        dispatch(getRepliesRequest());

        const token = await getToken()

        const {data} = await axios.get(`${URI}/get-posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const dataPosts = data.posts;

        dispatch(getRepliesSuccess({dataPosts}));
    } catch (error: any) {
        dispatch(
            getRepliesFailed(
                (error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"
            )
        );
    }
};
