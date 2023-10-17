import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from 'react-redux';
import Auth from "./Auth";
import {Loader} from "../components/Loader/Loader";
import {Main} from "./Main";
import {loadUser} from "../redux/actions/loadUser";
import Store from "../redux/store";

const HomeScreen = () => {
    const {isAuthenticated, loading} = useSelector((state: any) => state.user);

    useEffect(() => {
        Store.dispatch(loadUser());
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
