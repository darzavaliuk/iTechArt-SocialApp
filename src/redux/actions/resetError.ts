import { createAction } from '@reduxjs/toolkit';
import * as types from '../actionTypes/actionTypes';

export const resetErrorRequest = createAction(types.RESET_ERROR)();
