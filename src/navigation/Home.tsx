import React from 'react';
import {StatusBar, Text} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from 'react-redux';
import Auth from "./Auth";
import {Loader} from "../components/Loader";

const HomeScreen = () => {
    const {isAuthenticated, loading} = useSelector((state: any) => state.user);

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle={'dark-content'}
                showHideTransition={'fade'}
            />
            <>
                {
                    loading ? (
                        <Loader/>
                    ) : (
                        <NavigationContainer>
                            {isAuthenticated ? (
                                <Text>Main</Text>
                            ) : (
                                <Auth/>
                            )}
                        </NavigationContainer>
                    )
                }
            </>
        </>)
};

export default HomeScreen;
