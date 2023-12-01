import {getToken} from "../../utils/getToken";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";
import {Dispatch} from "redux";
import {createAction} from "@reduxjs/toolkit";
import {
    GET_NOTIFICATIONS_FAILED,
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS
} from "../actionTypes/actionTypes";

const getNotificationsRequest = createAction(GET_NOTIFICATIONS_REQUEST);
const getNotificationsSuccess = createAction<any, typeof GET_NOTIFICATIONS_SUCCESS>(GET_NOTIFICATIONS_SUCCESS);
const getNotificationsFailed = createAction<any, typeof GET_NOTIFICATIONS_FAILED>(GET_NOTIFICATIONS_FAILED);

export type GetAllPostsAction =
    | ReturnType<typeof getNotificationsRequest>
    | ReturnType<typeof getNotificationsSuccess>
    | ReturnType<typeof getNotificationsFailed>;

export const getNotifications = () => async (dispatch: Dispatch<GetAllPostsAction>) => {
    try {
        dispatch(getNotificationsRequest());

        const token = await getToken();

        const {data} = await axios.get(`${URI}/get-notifications`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const dataNotifications = data.notifications

        dispatch(getNotificationsSuccess({dataNotifications}));
    } catch (error: any) {
        dispatch(
            getNotificationsFailed(
                (error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"
            )
        );
    }
};
