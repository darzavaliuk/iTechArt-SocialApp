import {userReducer} from "./userReducer";
import {combineReducers} from "@reduxjs/toolkit";
import {postReducer} from "./postReducer";
import {notificationReducer} from "./notificationReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    notification: notificationReducer
});

export type RootState = ReturnType<typeof rootReducer>;
