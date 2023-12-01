import {Dispatch} from "redux";
import {getToken} from "../../utils/getToken";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {User} from "../reducers/User";
import {createAction} from "@reduxjs/toolkit";
import {
    CREATE_POST_FAILED,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
} from "../actionTypes/actionTypes";

const createPostRequest = createAction(CREATE_POST_REQUEST);
const createPostSuccess = createAction<any, typeof CREATE_POST_SUCCESS>(CREATE_POST_SUCCESS);
const createPostFailed = createAction<any, typeof CREATE_POST_FAILED>(CREATE_POST_FAILED);

export type CreatePostsAction =
    | ReturnType<typeof createPostRequest>
    | ReturnType<typeof createPostSuccess>
    | ReturnType<typeof createPostFailed>;

export const createPostAction =
    (
        title: string,
        image: string,
        user: User,
        replies: Array<{ title: string; image: string; user: User }>,
    ) =>
        async (dispatch: Dispatch<CreatePostsAction>) => {
            try {
                dispatch(createPostRequest());

                const token = await getToken();

                const {data} = await axios.post(
                    `${URI}/create-post`,
                    {title, image, user, replies},
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    });
                const userData = data.user
                dispatch(createPostSuccess(
                    {userData}
                ));
            } catch (error) {
                dispatch(createPostFailed((error as AxiosError<{
                    message: string
                }>)?.response?.data?.message || "Unexpected error"));
            }
        };
