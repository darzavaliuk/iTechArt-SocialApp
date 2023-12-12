import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {URI} from "../../URI";
import {User} from "../reducers/User";
import {authRequest} from "./authFetch";
import {createPostFailed, createPostRequest, createPostSuccess} from "./createAction";

export type CreatePostsAction =
    | ReturnType<typeof createPostRequest>
    | ReturnType<typeof createPostSuccess>
    | ReturnType<typeof createPostFailed>;

interface PostData {
    user: User;
}

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
                const response = await authRequest<PostData>(
                    'POST',
                    `${URI}/create-post`,
                    {title, image, user, replies}
                );

                const userData = response.user;

                dispatch(createPostSuccess(
                    {userData}
                ));
            } catch (error) {
                dispatch(createPostFailed((error as AxiosError<{
                    message: string
                }>)?.response?.data?.message || "Unexpected error"));
            }
        };
