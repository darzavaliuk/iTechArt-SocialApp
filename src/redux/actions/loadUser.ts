import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {URI} from "../../URI";
import {authRequest} from "./authFetch";
import {loadUserFailed, loadUserRequest, loadUserSuccess} from "./createAction";

export type LoadUserAction =
    | ReturnType<typeof loadUserRequest>
    | ReturnType<typeof loadUserSuccess>
    | ReturnType<typeof loadUserFailed>;

export const loadUser = () => async (dispatch: Dispatch<LoadUserAction>) => {
    try {
        dispatch(loadUserRequest());

        const data = await authRequest<any>('get', `${URI}/me`);

        const user = data.user;

        dispatch(loadUserSuccess({user}));
    } catch (error) {
        dispatch(loadUserFailed((error as AxiosError<{
            message: string
        }>)?.response?.data?.message || "Unexpected error"));
    }
};
