import axios from 'axios';
import {Dispatch} from 'redux';
import {URI} from "../../URI";
import {getToken} from "../../utils/getToken";
import {Reply} from "../reducers/User";

interface LikesParams {
    postId?: string | null;
    posts: any;
    user: any;
    replyId?: string | null;
    title?: string;
    singleReplyId?: string;
}

export const addLikes =
    ({postId, posts, user}: LikesParams) =>
        async (dispatch: Dispatch<any>) => {
            try {
                const token = await getToken()

                const updatedPosts = posts.map((userObj: any) =>
                    userObj._id === postId
                        ? {
                            ...userObj,
                            likes: [
                                ...userObj.likes,
                                {
                                    userName: user.name,
                                    userId: user._id,
                                    userAvatar: user.avatar.url,
                                    postId,
                                },
                            ],
                        }
                        : userObj,
                );

                dispatch({
                    type: 'GET_POSTS_SUCCESS',
                    payload: {dataPosts: updatedPosts},
                });

                await axios.put(
                    `${URI}/update-likes`,
                    {postId},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            } catch (error: any) {
                console.log(error, 'error');
            }
        };

// remove likes
export const removeLikes =
    ({postId, posts, user}: LikesParams) =>
        async (dispatch: Dispatch<any>) => {
            try {
                const token = await getToken()

                const updatedPosts = posts.map((userObj: any) =>
                    userObj._id === postId
                        ? {
                            ...userObj,
                            likes: userObj.likes.filter(
                                (like: any) => like.userId !== user._id,
                            ),
                        }
                        : userObj,
                );
                dispatch({
                    type: 'GET_POSTS_SUCCESS',
                    payload: {dataPosts: updatedPosts},
                });

                await axios.put(
                    `${URI}/update-likes`,
                    {postId},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            } catch (error) {
                console.error('Error following likes:', error);
            }
        };

// add likes to reply
export const addLikesToReply =
    ({postId, posts, user, replyId, title}: LikesParams) =>
        async (dispatch: Dispatch<any>) => {
            try {
                const token = await getToken()
                const updatedPosts = posts.map((post: any) =>
                    post._id === postId
                        ? {
                            ...post,
                            replies: post.replies.map((reply: any) =>
                                reply._id === replyId
                                    ? {
                                        ...reply,
                                        likes: [
                                            ...reply.likes,
                                            {
                                                userName: user.name,
                                                userId: user._id,
                                                userAvatar: user.avatar.url,
                                            },
                                        ],
                                    }
                                    : reply,
                            ),
                        }
                        : post,
                );
                dispatch({
                    type: 'GET_POSTS_SUCCESS',
                    payload: {dataPosts: updatedPosts},
                });

                await axios.put(
                    `${URI}/update-replies-react`,
                    {postId, replyId, replyTitle: title},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            } catch (error) {
                console.log(error, 'error');
            }
        };

export const removeLikesFromReply =
    ({postId, posts, user, replyId}: LikesParams) =>
        async (dispatch: Dispatch<any>) => {
            try {
                const token = await  getToken()

                const updatedPosts = posts.map((post: any) =>
                    post._id === postId
                        ? {
                            ...post,
                            replies: post.replies.map((reply: any) =>
                                reply._id === replyId
                                    ? {
                                        ...reply,
                                        likes: reply.likes.filter(
                                            (like: any) => like.userId !== user._id,
                                        ),
                                    }
                                    : reply,
                            ),
                        }
                        : post,
                );

                dispatch({
                    type: 'GET_POSTS_SUCCESS',
                    payload: {dataPosts: updatedPosts},
                });

                await axios.put(
                    `${URI}/update-replies-react`,
                    {postId, replyId},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            } catch (error: any) {
                console.log(error, 'error');
            }
        };

export const addLikesToRepliesReply =
    ({postId, posts, user, replyId, singleReplyId, title}: LikesParams) =>
        async (dispatch: Dispatch<any>) => {
            try {
                const token = await getToken()

                const updatedPosts = posts.map((post: any) =>
                    post._id === postId
                        ? {
                            ...post,
                            replies: post.replies.map((r: any) =>
                                r._id === replyId
                                    ? {
                                        ...r,
                                        reply: r.reply.map((reply: any) =>
                                            reply._id === singleReplyId
                                                ? {
                                                    ...reply,
                                                    likes: [
                                                        ...reply.likes,
                                                        {
                                                            userName: user.name,
                                                            userId: user._id,
                                                            userAvatar: user.avatar.url,
                                                        },
                                                    ],
                                                }
                                                : reply,
                                        ),
                                    }
                                    : r,
                            ),
                        }
                        : post,
                );

                dispatch({
                    type: 'GET_POSTS_SUCCESS',
                    payload: {dataPosts: updatedPosts},
                });
                await axios.put(
                    `${URI}/update-reply-react`,
                    {postId, replyId, singleReplyId, replyTitle: title},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            } catch (error) {
                console.log(error, 'error');
            }
        };

export const removeLikesFromRepliesReply =
    ({postId, posts, user, replyId, singleReplyId}: LikesParams) =>
        async (dispatch: Dispatch<any>) => {
            try {
                const token = await getToken();

                const updatedPosts = posts.map((post: any) =>
                    post._id === postId
                        ? {
                            ...post,
                            replies: post.replies.map((r: any) =>
                                r._id === replyId
                                    ? {
                                        ...r,
                                        reply: r.reply.map((reply: Reply) =>
                                            reply._id === singleReplyId
                                                ? {
                                                    ...reply,
                                                    likes: reply.likes?.filter(
                                                        (like: any) => like.userId !== user._id,
                                                    ),
                                                }
                                                : reply,
                                        ),
                                    }
                                    : r,
                            ),
                        }
                        : post,
                );

                dispatch({
                    type: 'GET_POSTS_SUCCESS',
                    payload: {dataPosts: updatedPosts},
                });

                await axios.put(
                    `${URI}/update-reply-react`,
                    {postId, replyId, singleReplyId},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            } catch (error) {
                console.log(error, 'error');
            }
        };
