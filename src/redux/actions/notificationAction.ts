import { getToken } from '../../utils/getToken';
import axios, { AxiosError } from 'axios';
import { URI } from '../../URI';
import { Dispatch } from 'redux';
import { authRequest } from './authFetch';
import { getNotificationsFailed, getNotificationsRequest, getNotificationsSuccess } from './createAction';

export type GetAllPostsAction =
  | ReturnType<typeof getNotificationsRequest>
  | ReturnType<typeof getNotificationsSuccess>
  | ReturnType<typeof getNotificationsFailed>;

export const getNotifications = () => async (dispatch: Dispatch<GetAllPostsAction>) => {
  try {
    dispatch(getNotificationsRequest());

    const data = await authRequest<any>('get', `${URI}/get-notifications`);

    const dataNotifications = data.notifications;

    dispatch(getNotificationsSuccess({ dataNotifications }));
  } catch (error: any) {
    dispatch(
      getNotificationsFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || 'Unexpected error')
    );
  }
};
