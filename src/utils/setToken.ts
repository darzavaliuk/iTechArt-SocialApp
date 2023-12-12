import * as Keychain from 'react-native-keychain';

export const setToken = async (token: string) => {
    try {
        await Keychain.setInternetCredentials('token', "token", token)
    } catch (error) {
        console.log(error);
    }
};

export const setRefreshToken = async (token: string) => {
    try {
        await Keychain.setInternetCredentials('refreshToken', "refreshToken", token);
    } catch (error) {
        console.log(error);
    }
};
