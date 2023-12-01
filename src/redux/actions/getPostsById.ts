import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {Post} from "../reducers/User";
import {createAction} from "@reduxjs/toolkit";

const getPostsRequest = createAction('GET_POSTS_REQUEST');
const getPostsSuccess = createAction<Post[]>('GET_POSTS_SUCCESS');
const getPostsError = createAction<string>('GET_POSTS_ERROR');

export const getPosts = (id: string, token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(getPostsRequest());

            const response = await axios.get(`${URI}/get-posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const posts: Post[] = response.data.posts;

            dispatch(getPostsSuccess(posts));
        } catch (error) {
            dispatch(getPostsError((error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"));
        }
    };
};
