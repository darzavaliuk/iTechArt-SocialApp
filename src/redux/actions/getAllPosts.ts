import {Dispatch} from "redux";
import {getToken} from "../../utils/getToken";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";
import {
    GET_POSTS_FAILED,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS
} from "../actionTypes/actionTypes";

const getAllPostsRequest = createAction(GET_POSTS_REQUEST);
const getAllPostsSuccess = createAction<any, typeof GET_POSTS_SUCCESS>(GET_POSTS_SUCCESS);
const getAllPostsFailed = createAction<any, typeof GET_POSTS_FAILED>(GET_POSTS_FAILED);

export type GetAllPostsAction =
    | ReturnType<typeof getAllPostsRequest>
    | ReturnType<typeof getAllPostsSuccess>
    | ReturnType<typeof getAllPostsFailed>;


export const getAllPosts = () => async (dispatch: Dispatch<GetAllPostsAction>) => {
    try {
        dispatch(getAllPostsRequest())

        const token = await getToken()

        const {data} = await axios.get(`${URI}/get-all-posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const dataPosts = data.posts

        dispatch(getAllPostsSuccess({dataPosts}));
    } catch (error: any) {
        dispatch(
            getAllPostsFailed(
                (error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"
            )
        );
    }
};
