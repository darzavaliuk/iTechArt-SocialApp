import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux';
import Auth from "./Auth";
import {Main} from "./Main";
import {loadUser, LoadUserAction} from "../redux/actions/loadUser";
import {RootState} from "../redux/reducers/rootReducer";
import {ThunkDispatch} from "@reduxjs/toolkit";

const HomeScreen = () => {
    const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const dispatch = useDispatch<ThunkDispatch<RootState, undefined, LoadUserAction>>();
    useEffect(() => {
        dispatch(loadUser());
    }, []);

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle={'dark-content'}
                showHideTransition={'fade'}
            />

            <NavigationContainer>
                {isAuthenticated ? (
                    <Main/>
                ) : (
                    <Auth/>
                )}
            </NavigationContainer>

        </>)
};

export default HomeScreen;
