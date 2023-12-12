import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {URI} from "../../URI";
import {authRequest} from "./authFetch";
import {getRepliesFailed, getRepliesRequest, getRepliesSuccess} from "./createAction";

export type GetRepliesAction =
    | ReturnType<typeof getRepliesRequest>
    | ReturnType<typeof getRepliesSuccess>
    | ReturnType<typeof getRepliesFailed>;


export const getReplies = () => async (dispatch: Dispatch<GetRepliesAction>) => {
    try {
        dispatch(getRepliesRequest());

        const data = await authRequest<any>('get', `${URI}/get-replies`);

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
