import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { URI } from '../../URI';
import { Post } from '../reducers/User';
import { authRequest } from './authFetch';
import { getPostsError, getPostsRequest, getPostsSuccess } from './createAction';

export const getPosts = (id: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getPostsRequest());

      const response = await authRequest<any>('get', `${URI}/get-posts/${id}`);

      const posts: Post[] = response.posts;

      dispatch(getPostsSuccess(posts));
    } catch (error) {
      dispatch(
        getPostsError((error as AxiosError<{ message: string }>)?.response?.data?.message || 'Unexpected error')
      );
    }
  };
};
