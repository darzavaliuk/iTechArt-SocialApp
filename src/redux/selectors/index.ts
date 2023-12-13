import { RootState } from '../reducers/rootReducer';

export const selectPosts = (state: RootState) => state.post;

export const selectPostsID = (state: RootState) => state.postsReducer;

export const selectUser = (state: RootState) => state.user;

export const selectProfileUser = (state: RootState) => state.profileReducer;

export const selectCode = (state: RootState) => state.user.code;

export const selectPost = (state: RootState) => state.post;

export const selectLoading = (state: RootState) => state.user.loading;

export const selectError = (state: RootState) => state.user.error;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

export const selectTargets = (state: RootState) => state.user.targets;

export const selectReplies = (state: RootState) => state.replyReducer;
