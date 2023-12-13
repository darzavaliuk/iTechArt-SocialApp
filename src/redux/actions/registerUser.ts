import { URI } from '../../URI';
import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import * as types from '../actionTypes/actionTypes';
import { setToken } from '../../utils/setToken';
import { User } from '../reducers/User';
import { authRequest } from './authFetch';
import { registerUserFailed, registerUserRequest, registerUserSuccess } from './createAction';

type RegisterUserAction =
  | ReturnType<typeof registerUserRequest>
  | ReturnType<typeof registerUserSuccess>
  | ReturnType<typeof registerUserFailed>;

export const registerUser =
  (name: string, email: string, password: string, avatar: string) => async (dispatch: Dispatch<RegisterUserAction>) => {
    try {
      dispatch(registerUserRequest());

      const config = { headers: { 'Content-Type': 'application/json' } };

      const data = await authRequest<any>('post', `${URI}/registration`, { name, email, password, avatar }, config);

      dispatch(registerUserSuccess({ user: data.user }));

      try {
        await setToken(data.token);
      } catch (error) {
        dispatch(
          registerUserFailed({
            error:
              (
                error as AxiosError<{
                  message: string;
                }>
              )?.response?.data?.message || 'Unexpected error',
          })
        );
      }
    } catch (error) {
      dispatch(
        registerUserFailed({
          error:
            (
              error as AxiosError<{
                message: string;
              }>
            )?.response?.data?.message || 'Unexpected error',
        })
      );
    }
  };
