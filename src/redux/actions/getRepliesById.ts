import {Reply} from "../reducers/User";
import {URI} from "../../URI";
import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {createAction} from "@reduxjs/toolkit";

const getRepliesRequest = createAction('GET_REPLIES_REQUEST');
const getRepliesSuccess = createAction<Reply[]>('GET_REPLIES_SUCCESS');
const getRepliesError = createAction<string>('GET_REPLIES_ERROR');

export const getReplies = (id: string, token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(getRepliesRequest());

            const response = await axios.get(`${URI}/get-replies/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const replies: Reply[] = response.data.posts;

            dispatch(getRepliesSuccess(replies));
        } catch (error) {
            dispatch(getRepliesError((error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"));
        }
    };
};
