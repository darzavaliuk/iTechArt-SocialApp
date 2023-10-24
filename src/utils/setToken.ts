import * as Keychain from 'react-native-keychain';

export const setToken = async (token: string) => {
    try {
        await Keychain.setGenericPassword('token', token);
    } catch (error) {
        console.log(error);
    }
};
