import {userReducer} from "./userReducer";
import {combineReducers} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
