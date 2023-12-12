import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {URI} from "../../URI";
import {authRequest} from "./authFetch";
import {getAllPostsFailed, getAllPostsRequest, getAllPostsSuccess} from "./createAction";

export type GetAllPostsAction =
    | ReturnType<typeof getAllPostsRequest>
    | ReturnType<typeof getAllPostsSuccess>
    | ReturnType<typeof getAllPostsFailed>;


export const getAllPosts = () => async (dispatch: Dispatch<GetAllPostsAction>) => {
    try {
        dispatch(getAllPostsRequest())

        const data = await authRequest<any>('GET', `${URI}/get-all-posts`, null);

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
