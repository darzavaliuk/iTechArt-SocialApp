import * as Keychain from 'react-native-keychain';

export const getToken = async () => {
  try {
    const credentials = await Keychain.getInternetCredentials('token');
    // await Keychain.resetGenericPassword();
    console.log(credentials);
    if (credentials) {
      console.log(credentials.password);
      return credentials.password;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRefreshToken = async () => {
  try {
    const credentials = await Keychain.getInternetCredentials('refreshToken');
    // await Keychain.resetGenericPassword();
    if (credentials) {
      console.log(credentials.password);
      return credentials.password;
    }
  } catch (error) {
    console.log(error);
  }
};
