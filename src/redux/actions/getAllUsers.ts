import {URI} from "../../URI";
import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {authRequest} from "./authFetch";
import {getAllUsersFailed, getAllUsersRequest, getAllUsersSuccess} from "./createAction";

export type GetAllPostsAction =
    | ReturnType<typeof getAllUsersRequest>
    | ReturnType<typeof getAllUsersSuccess>
    | ReturnType<typeof getAllUsersFailed>;


export const getAllUsers = () => async (dispatch: Dispatch<GetAllPostsAction>) => {
    try {
        dispatch(getAllUsersRequest());

        const data = await authRequest<any>('get', `${URI}/users`);

        const dataUsers = data.users;

        dispatch(getAllUsersSuccess(dataUsers));
    } catch (error) {
        dispatch(
            getAllUsersFailed(
                (error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"
            )
        );
    }
};
