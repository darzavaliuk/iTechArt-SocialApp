import {userReducer} from "./userReducer";
import {combineReducers} from "@reduxjs/toolkit";
import {postReducer} from "./postReducer";
import {notificationReducer} from "./notificationReducer";
import {eventsReducer} from "./eventsReducer";
import {postsReducer, replyReducer} from "./postsReducer";
import {profileReducer} from "./userProfileReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    notification: notificationReducer,
    events: eventsReducer,
    profileReducer: profileReducer,
    postsReducer: postsReducer,
    replyReducer: replyReducer
});

export type RootState = ReturnType<typeof rootReducer>;
