import {applyMiddleware, createStore} from "@reduxjs/toolkit";
import {rootReducer} from "../reducers/rootReducer";
import thunkMiddleware from "redux-thunk";

const Store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default Store;
