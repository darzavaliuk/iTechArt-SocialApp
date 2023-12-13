import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import {
  CREATE_POST_FAILED,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_TARGET_FAILED,
  CREATE_TARGET_REQUEST,
  CREATE_TARGET_SUCCESS,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FORGET_PASSWORD_FAILED,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  GET_NOTIFICATIONS_FAILED,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_POST_FAILED,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POSTS_FAILED,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_REPLIES_FAILED,
  GET_REPLIES_REQUEST,
  GET_REPLIES_SUCCESS,
  GET_USERS_FAILED,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  LOAD_TARGETS_FAILED,
  LOAD_TARGETS_REQUEST,
  LOAD_TARGETS_SUCCESS,
  LOAD_USER_FAILED,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  SET_TARGET_FAILED,
  SET_TARGET_REQUEST,
  SET_TARGET_SUCCESS,
} from '../../actionTypes/actionTypes';
import { Post, Reply, User } from '../../reducers/User';
import * as types from '../../actionTypes/actionTypes';

export const createPostRequest = createAction(CREATE_POST_REQUEST);
export const createPostSuccess = createAction<any, typeof CREATE_POST_SUCCESS>(CREATE_POST_SUCCESS);
export const createPostFailed = createAction<any, typeof CREATE_POST_FAILED>(CREATE_POST_FAILED);
export const createTargetRequest = createAction(CREATE_TARGET_REQUEST);
export const createTargetSuccess = createAction<any, typeof CREATE_TARGET_SUCCESS>(CREATE_TARGET_SUCCESS);
export const createTargetFailed = createAction<any, typeof CREATE_TARGET_FAILED>(CREATE_TARGET_FAILED);

export const followUserRequest = createAction('followUserRequest');
export const followUserSuccess = createAction<User[]>('followUserSuccess');
export const followUserFail = createAction<string>('followUserFail');
export const forgetPasswordRequest = createAction(FORGET_PASSWORD_REQUEST);
export const forgetPasswordSuccess = createAction<{ code: string; email: string }>(FORGET_PASSWORD_SUCCESS);
export const forgetPasswordFailed = createAction<string>(FORGET_PASSWORD_FAILED);
export const getAllPostsRequest = createAction(GET_POSTS_REQUEST);
export const getAllPostsSuccess = createAction<any, typeof GET_POSTS_SUCCESS>(GET_POSTS_SUCCESS);
export const getAllPostsFailed = createAction<any, typeof GET_POSTS_FAILED>(GET_POSTS_FAILED);
export const getAllUsersRequest = createAction(GET_USERS_REQUEST);
export const getAllUsersSuccess = createAction<any, typeof GET_USERS_SUCCESS>(GET_USERS_SUCCESS);
export const getAllUsersFailed = createAction<any, typeof GET_USERS_FAILED>(GET_USERS_FAILED);
export const fetchEventsRequest: ActionCreatorWithPayload<
  {
    month: number;
    year: number;
  },
  typeof FETCH_EVENTS_REQUEST
> = createAction(FETCH_EVENTS_REQUEST);
export const fetchEventsSuccess: ActionCreatorWithPayload<any, typeof FETCH_EVENTS_SUCCESS> =
  createAction(FETCH_EVENTS_SUCCESS);
export const fetchEventsFailure: ActionCreatorWithPayload<any, typeof FETCH_EVENTS_FAILURE> =
  createAction(FETCH_EVENTS_FAILURE);
export const getPostRequest = createAction(GET_POST_REQUEST);
export const getPostSuccess = createAction<any, typeof GET_POST_SUCCESS>(GET_POST_SUCCESS);
export const getPostFailed = createAction<any, typeof GET_POST_FAILED>(GET_POST_FAILED);
export const getPostsRequest = createAction('GET_POSTS_REQUEST');
export const getPostsSuccess = createAction<Post[]>('GET_POSTS_SUCCESS');
export const getPostsError = createAction<string>('GET_POSTS_ERROR');
export const getRepliesRequest = createAction(GET_REPLIES_REQUEST);
export const getRepliesSuccess = createAction<any, typeof GET_REPLIES_SUCCESS>(GET_REPLIES_SUCCESS);
export const getRepliesFailed = createAction<any, typeof GET_REPLIES_FAILED>(GET_REPLIES_FAILED);
export const getRepliesIdRequest = createAction('GET_REPLIES_REQUEST1');
export const getRepliesIdSuccess = createAction<Reply[]>('GET_REPLIES_SUCCESS1');
export const getRepliesIdError = createAction<string>('GET_REPLIES_ERROR1');
export const profileRequest = createAction('PROFILE_REQUEST');
export const profileSuccess = createAction<User>('PROFILE_SUCCESS');
export const profileError = createAction<string>('PROFILE_ERROR');
export const loadTargetsRequest = createAction(LOAD_TARGETS_REQUEST);
export const loadTargetsSuccess = createAction<any, typeof LOAD_TARGETS_SUCCESS>(LOAD_TARGETS_SUCCESS);
export const loadTargetsFailed = createAction<any, typeof LOAD_TARGETS_FAILED>(LOAD_TARGETS_FAILED);
export const loadUserRequest = createAction(LOAD_USER_REQUEST);
export const loadUserSuccess = createAction<
  {
    user: string;
  },
  typeof LOAD_USER_SUCCESS
>(LOAD_USER_SUCCESS);
export const loadUserFailed = createAction<string, typeof LOAD_USER_FAILED>(LOAD_USER_FAILED);
export const loginUserRequest = createAction(LOGIN_USER_REQUEST);
export const loginUserSuccess = createAction<{ user: string }, typeof LOGIN_USER_SUCCESS>(LOGIN_USER_SUCCESS);
export const loginUserFailed = createAction<string, typeof LOGIN_USER_FAILED>(LOGIN_USER_FAILED);
export const getNotificationsRequest = createAction(GET_NOTIFICATIONS_REQUEST);
export const getNotificationsSuccess = createAction<any, typeof GET_NOTIFICATIONS_SUCCESS>(GET_NOTIFICATIONS_SUCCESS);
export const getNotificationsFailed = createAction<any, typeof GET_NOTIFICATIONS_FAILED>(GET_NOTIFICATIONS_FAILED);
export const registerUserRequest = createAction(types.REGISTER_USER_REQUEST);
export const registerUserSuccess = createAction<{ user: User }>(types.REGISTER_USER_SUCCESS);
export const registerUserFailed = createAction<{ error: string }>(types.REGISTER_USER_FAILED);
export const resetPasswordRequest = createAction(types.RESET_PASSWORD_REQUEST);
export const resetPasswordSuccess = createAction<{ data: any }>(types.RESET_PASSWORD_SUCCESS);
export const resetPasswordFailed = createAction<{ error: string }>(types.RESET_PASSWORD_FAILED);
export const setTargetRequest = createAction(SET_TARGET_REQUEST);
export const setTargetSuccess = createAction<any, typeof SET_TARGET_SUCCESS>(SET_TARGET_SUCCESS);
export const setTargetFailed = createAction<any, typeof SET_TARGET_FAILED>(SET_TARGET_FAILED);
