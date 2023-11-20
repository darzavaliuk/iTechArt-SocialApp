import {URI} from "../../URI";
import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {getToken} from "../../utils/getToken";
import {createAction} from "@reduxjs/toolkit";
import {
    GET_USERS_FAILED,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS
} from "../actionTypes/actionTypes";

const getAllUsersRequest = createAction(GET_USERS_REQUEST);
const getAllUsersSuccess = createAction<any, typeof GET_USERS_SUCCESS>(GET_USERS_SUCCESS);
const getAllUsersFailed = createAction<any, typeof GET_USERS_FAILED>(GET_USERS_FAILED);

export type GetAllPostsAction =
    | ReturnType<typeof getAllUsersRequest>
    | ReturnType<typeof getAllUsersSuccess>
    | ReturnType<typeof getAllUsersFailed>;


export const getAllUsers = () => async (dispatch: Dispatch<GetAllPostsAction>) => {
    try {
        dispatch(getAllUsersRequest());

        const token = await getToken();

        const {data} = await axios.get(`${URI}/users`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        const dataUsers = data.users;

        dispatch(getAllUsersSuccess(dataUsers));
    } catch (error: any) {
        dispatch(
            getAllUsersFailed(
                (error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"
            )
        );
    }
};
