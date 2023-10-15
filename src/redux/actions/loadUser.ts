import {Dispatch} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {AxiosError} from "axios";
import {URI} from "../../URI";

export const loadUser = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: 'userLoadRequest',
        });

        const token = await AsyncStorage.getItem('token');

        const {data} = await axios.get(`${URI}/me`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        dispatch({
            type: 'userLoadSuccess',
            payload: {
                user: data.user,
                token,
            },
        });
    } catch (error: unknown) {
        dispatch({
            type: 'userLoadFailed',
            payload: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Unexpected error",
        });
    }
};
