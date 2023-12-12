import {getToken} from "../../utils/getToken";
import {Dispatch} from "redux";
import {URI} from "../../URI";
import axios from "axios";
import {User} from "../reducers/User";
import {createAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {authRequest} from "./authFetch";
import {followUserFail, followUserRequest, followUserSuccess} from "./createAction";

interface FollowUnfollowParams {
    userId: string;
    followUserId: string;
    users: User[];
}

export type FollowUserAction =
    | ReturnType<typeof followUserRequest>
    | ReturnType<typeof followUserSuccess>
    | ReturnType<typeof followUserFail>;

export const followUserAction = ({
                                     userId,
                                     users,
                                     followUserId,
                                 }: FollowUnfollowParams) => async (dispatch: Dispatch<FollowUserAction>) => {
    try {
        dispatch(followUserRequest());

        const updatedUsers = users.map((userObj) =>
            userObj._id === followUserId
                ? {
                    ...userObj,
                    followers: [...userObj.followers, {userId}],
                }
                : userObj
        );

        dispatch(followUserSuccess(updatedUsers));

        await authRequest<any>(
            'put',
            `${URI}/add-user`,
            {followUserId}
        );

    } catch (error) {
        dispatch(followUserFail((error as AxiosError<{ message: string }>)?.response?.data?.message ||
            "Unexpected error"));
    }
};

export type UnfollowUserAction =
    | ReturnType<typeof unfollowUserRequest>
    | ReturnType<typeof unfollowUserSuccess>
    | ReturnType<typeof unfollowUserFail>;


const unfollowUserRequest = createAction('unfollowUserRequest');
const unfollowUserSuccess = createAction<User[]>('unfollowUserSuccess');
const unfollowUserFail = createAction<string>('unfollowUserFail');

export const unfollowUserAction = ({
                                       userId,
                                       users,
                                       followUserId,
                                   }: FollowUnfollowParams) => async (dispatch: Dispatch<UnfollowUserAction>) => {
    try {
        dispatch(unfollowUserRequest());

        const token = await getToken();
        const updatedUsers = users.map((userObj) =>
            userObj._id === followUserId
                ? {
                    ...userObj,
                    followers: userObj.followers.filter(
                        (follower) => follower.userId !== userId
                    ),
                }
                : userObj
        );

        dispatch(unfollowUserSuccess(updatedUsers));

        await axios.put(
            `${URI}/add-user`,
            {followUserId},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        dispatch(unfollowUserFail((error as AxiosError<{ message: string }>)?.response?.data?.message ||
            "Unexpected error"));
    }
};
