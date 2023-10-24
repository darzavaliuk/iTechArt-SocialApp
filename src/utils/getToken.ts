import * as Keychain from 'react-native-keychain';

export const getToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
           return credentials.password;
        }
    } catch (error) {
        console.log(error);
    }
};
