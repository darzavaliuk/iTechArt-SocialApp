import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/rootReducer';
import { Action, AnyAction } from '@reduxjs/toolkit';
import { addLikes, removeLikes } from '../actions/postActions';

export const reactToPost = (
  userProfileId: string,
  userId: string,
  postId: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch, getState) => {
    const state = getState();
    const { user } = state.user;
    const { posts } = state.post;
    const item = posts.find((post) => post._id === userId);

    if (item?.likes?.length !== 0) {
      const isLikedBefore = item?.likes?.find((like) => like.userId === user._id);
      if (isLikedBefore) {
        dispatch<any>(removeLikes({ postId: postId ? postId : userProfileId, posts, user }));
      } else {
        dispatch<any>(addLikes({ postId: postId ? postId : userProfileId, posts, user }));
      }
    } else {
      dispatch<any>(addLikes({ postId: postId ? postId : userProfileId, posts, user }));
    }
  };
};
