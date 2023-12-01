import axios, {AxiosError} from 'axios';
import {User} from "../reducers/User";
import {Dispatch} from "redux";
import {URI} from "../../URI";
import {createAction} from "@reduxjs/toolkit";

const profileRequest = createAction('PROFILE_REQUEST');
const profileSuccess = createAction<User>('PROFILE_SUCCESS');
const profileError = createAction<string>('PROFILE_ERROR');

const getProfile = (id: string, token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(profileRequest());

            const response = await axios.get(`${URI}/get-user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const userProfile: User = response.data.user;

            dispatch(profileSuccess(userProfile));
        } catch (error) {
            dispatch(profileError((error as AxiosError<{ message: string }>)?.response?.data?.message ||
                "Unexpected error"));
        }
    };
};

export default getProfile;
